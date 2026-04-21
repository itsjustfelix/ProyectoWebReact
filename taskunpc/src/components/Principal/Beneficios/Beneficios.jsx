import React from "react";
import { beneficios } from "./beneficiosData";
import "./Beneficios.css";
const Beneficios = () => {
  return (
    <section className="beneficios" id="nosotros">
      <h2>¿Por qué usar MyVet?</h2>

      <div className="beneficios-grid">
        {beneficios.map((item, index) => (
          <div className="beneficio-item" key={index}>
            <div className="beneficio-icono">{item.icono}</div>
            <div className="beneficio-texto">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beneficios;
