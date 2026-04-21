import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { FaPaw } from "react-icons/fa";
const Hero = () => {
  return (
    <section className="hero">
      <span className="hero-badge">
        <FaPaw /> La veterinaria de tu barrio, ahora en línea
      </span>

      <h1>
        El bienestar de tu mascota, <span>siempre al alcance</span>
      </h1>

      <p>
        Agenda citas desde la comodidad de tu casa, consulta el historial médico
        de tu peludo y mantente al tanto de su salud — todo en un solo lugar,
        las 24 horas.
      </p>

      <div className="hero-btns">
        <a href="#servicios" className="hero-btn-primary">
          Ver servicios
        </a>
        <Link to="/registro" className="hero-btn-outline">
          Crear cuenta gratis
        </Link>
      </div>
    </section>
  );
};

export default Hero;
