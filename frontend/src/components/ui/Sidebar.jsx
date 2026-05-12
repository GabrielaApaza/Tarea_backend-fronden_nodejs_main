import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ui.css";

export function Sidebar({ counts = {} }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-title">MedSystem</span>
        <span className="sidebar-subtitle">Sistema de Gestión Médica</span>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {(usuario?.nombre || usuario?.name || "U")[0].toUpperCase()}
        </div>
        <div className="sidebar-user-info">
          <span className="sidebar-username">{usuario?.nombre || usuario?.name}</span>
          <span className="sidebar-role">Administrador</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Módulos</span>
        <NavLink
          to="/pacientes"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <span>Pacientes</span>
          {counts.pacientes != null && (
            <span className="sidebar-badge">{counts.pacientes}</span>
          )}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
