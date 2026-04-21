import React from "react";
import { redes } from "./RedesData";
import "./Redes.css";

const Redes = () => {
  return (
    <section className="redes" id="redes">
      <h2>Síguenos en redes sociales</h2>
      <p className="redes-sub">
        Mantente al tanto de consejos, noticias y promociones para el cuidado de
        tu mascota
      </p>

      <div className="redes-grid">
        {redes.map((red, index) => (
          <a
            key={index}
            href={red.url}
            className="red-btn"
            target="_blank"
            rel="noreferrer"
          >
            {red.icono}
            {red.nombre}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Redes;
