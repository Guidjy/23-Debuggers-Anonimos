function Header() {
  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo">
          gerencia.<span className="logo-highlight">ia</span>
        </div>

        {/* Perfil */}
        <div className="profile">
          <div className="avatar">V</div>
          <span className="profile-name">Vitória</span>
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
            cursor: default;
          }
          .logo-highlight {
            color: #93c5fd; /* azul claro */
          }
          .profile {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: white;
            user-select: none;
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
        `}
      </style>
    </>
  );
}

export default Header;
