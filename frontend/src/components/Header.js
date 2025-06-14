import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleLogout() {
    // Aqui você pode limpar tokens ou estado, se tiver
    // Exemplo: localStorage.removeItem('token');
    navigate('/login');
  }

  function handleLogoClick() {
    // Atualiza a página ao clicar na logo
    window.location.reload();
  }

  return (
    <>
      <header className="header">
        <div className="logo" onClick={handleLogoClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleLogoClick()}>
          gerencia.<span className="logo-highlight">ia</span>
        </div>

        <div className="profile" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <div className="avatar">V</div>
            <span className="profile-name">Vitória</span>
            <svg
              className={`chevron ${open ? 'open' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <ul className="dropdown-menu" role="menu">
              <li>
                <button onClick={handleLogout} role="menuitem" className="dropdown-item">
                  Sair
                </button>
              </li>
            </ul>
          )}
        </div>
      </header>

      <style>
        {`
          .header {
            background-color: #2563eb; /* bg-blue-600 */
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          }
          .logo {
            color: white;
            font-weight: 800;
            font-size: 1.5rem;
            letter-spacing: 0.05em;
            user-select: none;
            cursor: pointer;
            margin-left: 10px;
          }
          .logo-highlight {
            color: #93c5fd; /* azul claro */
          }
          .profile {
            position: relative;
            user-select: none;
          }
          .profile-button {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font: inherit;
            padding: 0;
          }
          .avatar {
            width: 40px;
            height: 40px;
            background-color: #93c5fd; /* azul claro */
            color: #1e3a8a; /* azul escuro */
            font-weight: 700;
            font-size: 1.25rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .profile-name {
            font-weight: 500;
          }
          .chevron {
            transition: transform 0.2s ease;
          }
          .chevron.open {
            transform: rotate(180deg);
          }
          .dropdown-menu {
            position: absolute;
            right: 0;
            top: 100%;
            margin-top: 0.5rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 120px;
            z-index: 100;
            padding: 0.5rem 0;
          }
          .dropdown-item {
            width: 100%;
            padding: 0.5rem 1rem;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-size: 1rem;
            color: #1e293b;
            transition: background-color 0.2s ease;
          }
          .dropdown-item:hover {
            background-color: #e0e7ff;
          }
        `}
      </style>
    </>
  );
}

export default Header;