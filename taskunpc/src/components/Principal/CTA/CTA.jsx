import React from "react";
import { Link } from "react-router-dom";
import "./CTA.css";
import { FaPaw } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="cta">
      <h2>
        ¿Listo para agendar una cita para tu peludo? <FaPaw />
      </h2>

      <p>
        Regístrate gratis y accede a todos los beneficios de MyVet desde hoy. Tu
        mascota se lo merece.
      </p>

      <Link to="/registro" className="cta-btn">
        Registrarme ahora
      </Link>
    </section>
  );
};

export default CTA;
