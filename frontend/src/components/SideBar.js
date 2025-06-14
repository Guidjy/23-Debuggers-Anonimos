import { useState } from "react";

function Layout() {
  const [active, setActive] = useState("dashboard");

  const links = [
    { id: "dashboard", label: "Dashboard", href: "#" },
  ];

  return (
    <>
      <header className="header">
        <h1>Meu App</h1>
      </header>

      <div className="container">
        <aside className="sidebar">
          <nav>
            <ul>
              {links.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    className={active === id ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100vh; font-family: Arial, sans-serif;
        }
        .header {
          width: 100%;
          height: 60px;
          background-color: #2563eb; /* azul forte */
          color: white;
          display: flex;
          align-items: center;
          padding: 0 20px;
          font-weight: bold;
          font-size: 1.5rem;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
        }
        .container {
          display: flex;
          margin-top: 60px; /* espaço pra header fixo */
          height: calc(100vh - 60px);
        }
        .sidebar {
          width: 250px;
          background-color: #dbeafe; /* azul clarinho */
          border-right: 2px solid #93c5fd;
          padding: 20px;
          overflow-y: auto;
        }
        .sidebar nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sidebar nav ul li {
          margin-bottom: 20px;
        }
        .sidebar nav ul li a {
          text-decoration: none;
          color: #2563eb;
          font-weight: bold;
          font-size: 18px;
          padding: 8px 12px;
          border-radius: 6px;
          display: block;
          transition: background-color 0.3s, color 0.3s;
          cursor: pointer;
        }
        .sidebar nav ul li a:hover {
          background-color: #93c5fd;
          color: #1e40af;
        }
        .sidebar nav ul li a.active {
          background-color: #2563eb;
          color: white;
        }
        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}

export default Layout;
