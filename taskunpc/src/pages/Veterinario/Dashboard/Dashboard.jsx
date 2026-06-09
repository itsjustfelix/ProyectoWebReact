import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClipboardList, FaStethoscope } from "react-icons/fa";
import "./Dashboard.css";
import { getCitasByVeterionarioAndFecha } from "../../../services/citaService";
import { countConsultasVeterinario } from "../../../services/consultaService";
import { formatearHora } from "../../../utils/FormatearHora";

const Dashboard = () => {
  const nombre = localStorage.getItem("nombre");
  const codigo = localStorage.getItem("codigo_usuario");

  const [citasHoy, setCitasHoy] = useState([]);
  const [totalConsultasHoy, setTotalConsultasHoy] = useState(0);
  const [cargando, setCargando] = useState(true);

  /* fecha de hoy en formato legible y en ISO para peticiones */
  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const fechaISO = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);

        const ciatsHoy = await getCitasByVeterionarioAndFecha(codigo);
        setCitasHoy(ciatsHoy);

        const consultasHoy = await countConsultasVeterinario(codigo);
        setTotalConsultasHoy(consultasHoy);
      } catch (error) {
        console.error(
          "Error al cargar datos del dashboard:",
          error.response?.data?.detail?.error?.message,
        );
      } finally {
        setCargando(false);
      }
    };

    if (codigo) cargarDatos();
  }, [codigo, fechaISO]);

  const getBadge = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return "badge-yellow";
      case "asistida":
        return "badge-green";
      case "cancelada":
        return "badge-red";
      default:
        return "badge-blue";
    }
  };

  return (
    <>
      <div className="vet-dash-topbar">
        <h2>Mi Panel</h2>
      </div>

      <div className="vet-dash-content">
        <div className="vet-dash-greeting">
          <h1>¡Bienvenido, Dr. {nombre}!</h1>
          <p>{fechaHoy}</p>
        </div>

        {/* tarjetas de resumen del día */}
        <div className="vet-dash-stats-grid">
          <div className="vet-dash-stat-card">
            <FaCalendarAlt size={32} color="#5bb8f5" />
            <div>
              <h3>{cargando ? "—" : citasHoy.length}</h3>
              <p>Citas para hoy</p>
            </div>
          </div>

          <div className="vet-dash-stat-card">
            <FaClipboardList size={32} color="#5bb8f5" />
            <div>
              <h3>{cargando ? "—" : totalConsultasHoy}</h3>
              <p>Consultas atendidas hoy</p>
            </div>
          </div>
        </div>

        <div className="vet-dash-section-card">
          <h3>
            <FaStethoscope size={16} color="#5bb8f5" /> Citas de hoy
          </h3>

          {cargando ? (
            <p className="vet-dash-empty">Cargando citas...</p>
          ) : citasHoy.length === 0 ? (
            <p className="vet-dash-empty">
              No tienes citas programadas para hoy.
            </p>
          ) : (
            <table className="vet-dash-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citasHoy.map((cita) => (
                  <tr key={cita.codigo}>
                    <td>{cita.nombre_mascota}</td>
                    <td>{formatearHora(cita.hora)}</td>
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
