import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../Logo/Logo";
import "./Sidebar.css";
import { logout } from "../../services/loginService";

const Sidebar = ({ links, usuario, rol }) => {
  const navigate = useNavigate();
  /**
   * Esto lo que hace es que cada vez que la pagina cambie de tamaño se verifique si el tamaño de la
   * pantalla es menor o igual a 768 esto porque a ese tamaño tenemos que la pagina sea responsive y
   * que se ponga para tamaño de telefono. esto se utiliza basiocamente para cuando el sidebar este en
   * modo pantalla pequeña, el componente logo solo muestre el logo mas no el nombre de la pagina
   */
  const [esMobil, setEsMobil] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setEsMobil(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*este codigo se utiliza para saber que tipo de usuario entro a la web
  y se guarda la ruta principal de ese usuario. despues esa ruta principal
  se le pasa al componente logo que funciona tambien de botn para redirigir 
  a la pantalla principal. si no se le pasara la ruta principal de cada usuario
  lo que pasaria es que al darle click redigiria a la pagina principal de la
  pagina web */
  const rutaInicio =
    rol === "1" ? "/admin" : rol === "2" ? "/veterinario" : "/propietario";
  /**
   * es una funcion que se utiliza cuando el usuario presione el
   * cerrar sesion, llama a esta funcion que elimina el localstrore
   * y lleva al usuario a la pagina del login
   */
  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Logo compacto={esMobil} to={rutaInicio} />
      </div>

      <div className="sidebar-section">Mi espacio</div>

      <nav>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            end={link.to.split("/").filter(Boolean).length <= 1}
            className={({ isActive }) =>
              isActive ? "sidebar-nav-item active" : "sidebar-nav-item"
            }
          >
            <span className="sidebar-nav-icon">{link.icono}</span>
            <span className="sidebar-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-chip">
          <div className="sidebar-avatar">
            <img
              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(usuario.nombre)}`}
              alt="avatar"
            />
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-uname">{usuario.nombre}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt size={14} />
          <span className="sidebar-label">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
