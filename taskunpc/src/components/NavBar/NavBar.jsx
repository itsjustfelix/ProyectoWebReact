import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./NavBar.css";

const NavBar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="MyVet" style={{ height: "36px" }} />
          My<span>Vet</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#nosotros">Nosotros</a>
          </li>
          <li>
            <a href="#redes">Redes</a>
          </li>
        </ul>

        <Link to="/login" className="navbar-btn-desktop">
          <button className="navbar-btn">Iniciar sesión</button>
        </Link>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`navbar-overlay ${menuAbierto ? "open" : ""}`}
        onClick={cerrarMenu}
      />

      <div className={`navbar-mobile ${menuAbierto ? "open" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>
        <a href="#servicios" onClick={cerrarMenu}>
          Servicios
        </a>
        <a href="#nosotros" onClick={cerrarMenu}>
          Nosotros
        </a>
        <a href="#redes" onClick={cerrarMenu}>
          Redes
        </a>
        <Link to="/login" onClick={cerrarMenu}>
          <button className="navbar-btn">Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
