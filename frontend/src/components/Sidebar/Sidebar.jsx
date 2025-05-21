import "./Sidebar.css"; // Certifique-se de que esse arquivo está em src/components/Sidebar/Sidebar.css
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaKey,
  FaBoxes,
  FaCalendarAlt,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">SGII</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link" end>
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/salas-chaves" className="sidebar-link">
          <FaKey className="sidebar-icon" /> Salas & Chaves
        </NavLink>
        <NavLink to="/dashboard/itens-inventario" className="sidebar-link">
          <FaBoxes className="sidebar-icon" /> Inventário
        </NavLink>
        <NavLink
          to="/dashboard/reservas-movimentacoes"
          className="sidebar-link"
        >
          <FaCalendarAlt className="sidebar-icon" /> Reservas & Movimentações
        </NavLink>
        <NavLink to="/dashboard/instituicao" className="sidebar-link">
          <FaUniversity className="sidebar-icon" /> Instituição
        </NavLink>
        <NavLink to="/dashboard/configuracoes" className="sidebar-link">
          <FaCog className="sidebar-icon" /> Configurações
        </NavLink>
        <NavLink to="/login" className="sidebar-link sidebar-logout">
          <FaSignOutAlt className="sidebar-icon" /> Sair
        </NavLink>
      </nav>
    </aside>
  );
}
