import React from "react";
import "./Servicios.css";
import { servicios } from "./servicioData";

const Servicios = () => {
  return (
    <section className="servicios" id="servicios">
      <h2>Lo que ofrecemos para tu mascota</h2>
      <p className="servicios-sub">
        Servicios pensados para que tú y tu peludo tengan la mejor experiencia
      </p>

      <div className="servicios-grid">
        {servicios.map((servicio, index) => (
          <div className="servicio-card" key={index}>
            <div className="servicio-icon">{servicio.icon}</div>
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
            <span className="servicio-tag">{servicio.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;
