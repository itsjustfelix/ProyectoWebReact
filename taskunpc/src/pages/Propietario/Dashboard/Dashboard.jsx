import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const nombre = localStorage.getItem("nombre") || "Usuario";
  const token = localStorage.getItem("token");
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const traerCitas = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:8000/citas/propietario/${codigoUsuario}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const datos = await respuesta.json();
        setCitas(datos);
      } catch (error) {
        console.error("Error al traer citas:", error);
      } finally {
        setCargando(false);
      }
    };
    traerCitas();
  }, [token, codigoUsuario]);

  const getBadge = (estado) => {
    switch (estado?.toLowerCase()) {
      case "confirmada":
        return "badge-blue";
      case "pendiente":
        return "badge-yellow";
      case "completada":
        return "badge-green";
      case "cancelada":
        return "badge-red";
      default:
        return "badge-blue";
    }
  };

  return (
    <>
      <div className="dashboard-topbar">
        <h2>Mi Panel</h2>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-greeting">
          <h1>¡Bienvenido, {nombre}! 🐾</h1>
          <p>{fechaHoy}</p>
        </div>

        <div className="dashboard-section-card">
          <h3>
            <FaCalendarAlt size={16} color="#5bb8f5" /> Próximas citas
          </h3>

          {cargando ? (
            <p className="dashboard-empty">Cargando citas...</p>
          ) : citas.length === 0 ? (
            <p className="dashboard-empty">
              No tienes citas próximas agendadas.
            </p>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Veterinario</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita, index) => (
                  <tr key={index}>
                    <td>{cita.nombre_mascota}</td>
                    <td>{cita.nombre_veterinario}</td>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>
                      <span className={`badge ${getBadge(cita.estado_cita)}`}>
                        {cita.estado_cita}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
