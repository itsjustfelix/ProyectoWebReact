import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Footer.css";
import { FaHeart } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src={logo} style={{ height: "36px" }} />

          <div className="footer-brand-nombre">
            My<span>Vet</span>
          </div>
          <p>
            Sistema de gestión veterinaria para Valledupar. Digitalizamos el
            cuidado de tu mascota para que siempre esté en buenas manos.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#nosotros">Nosotros</a>
            </li>
            <li>
              <a href="#redes">Redes sociales</a>
            </li>
            <li>
              <Link to="/registro">Registrarse</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="tel:+573000000000">+57 300 000 0000</a>
            </li>
            <li>
              <a href="mailto:info@myvet.com">info@myvet.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 <span>MyVet</span> · Todos los derechos reservados
        </p>
        <p>
          Hecho con <FaHeart color="red" /> en Valledupar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
