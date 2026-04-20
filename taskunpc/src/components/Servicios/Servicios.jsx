import React from "react";
import "./Servicios.css";

const servicios = [
  {
    icon: "📅",
    titulo: "Citas en línea",
    descripcion: "Agenda, reagenda o cancela citas con tu veterinario en segundos, sin llamadas ni filas.",
    tag: "Disponible 24/7"
  },
  {
    icon: "📋",
    titulo: "Historia clínica digital",
    descripcion: "Accede en cualquier momento al historial completo de diagnósticos, tratamientos y medicamentos de tu mascota.",
    tag: "Siempre disponible"
  },
  {
    icon: "👨‍⚕️",
    titulo: "Veterinarios especializados",
    descripcion: "Elige al profesional que mejor se adapte a las necesidades de tu mascota según su especialización.",
    tag: "Múltiples especialidades"
  },
  {
    icon: "📄",
    titulo: "Documentos en PDF",
    descripcion: "Descarga la historia clínica de tu mascota en formato PDF después de cada consulta.",
    tag: "Descarga instantánea"
  },
  {
    icon: "🔔",
    titulo: "Seguimiento de salud",
    descripcion: "Lleva un registro ordenado del estado de salud de cada una de tus mascotas en un solo perfil.",
    tag: "Multi-mascota"
  },
  {
    icon: "❌",
    titulo: "Cancelación fácil",
    descripcion: "¿No puedes asistir? Cancela tu cita desde la app con un clic, sin llamadas ni complicaciones.",
    tag: "Sin complicaciones"
  }
];

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