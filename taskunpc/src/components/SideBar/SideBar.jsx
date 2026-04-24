import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "../Logo/Logo";
import "./Sidebar.css";

const Sidebar = ({ links, usuario }) => {
  const navigate = useNavigate();
  const [esMobil, setEsMobil] = useState(window.innerWidth <= 768);
  const rolUsuario = Number(localStorage.getItem("rol"));

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
    rolUsuario === "1"
      ? "/admin"
      : rolUsuario === "2"
        ? "/veterinario"
        : "/propietario";
  /**
   * como no se sabe si vamos a cargar imagenes de los usuarios, esta funcion lo que hace es tomar
   * las iniciales de los dos primeros nombres y esto se utiliza como imagen. si no encuentra un nombre
   * entonces pone una "u"
   */
  const iniciales = usuario?.nombre
    ? usuario.nombre
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  /**
   * es una funcion que se utiliza cuando el usuario presione el
   * cerrar sesion, llama a esta funcion que elimina el localstrore
   * y lleva al usuario a la pagina del login
   */
  const handleLogout = () => {
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
          <div className="sidebar-avatar">{iniciales}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-uname">{usuario?.nombre}</div>
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
