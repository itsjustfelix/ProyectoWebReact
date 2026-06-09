import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaUsers,
  FaPaw,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import "./Dashboard.css";
import { countVeterinarios } from "../../../services/veterinarioService";
import { countPropietarios } from "../../../services/propietarioService";
import { countMascotas } from "../../../services/mascotasService";
import { countCitas, getCitasByFecha } from "../../../services/citaService";

const AdminDashboard = () => {
  const nombre = localStorage.getItem("nombre");
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [NumeroVeterinarios, setNumeroVeterinarios] = useState(0);
  const [NumeroPropietarios, setNumeroPropietarios] = useState(0);
  const [NumeroMascotas, setNumeroMascotas] = useState(0);
  const [NumeroCitasHoy, setNumeroCitasHoy] = useState(0);
  const [citasRecientes, setCitasRecientes] = useState([]);

  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hoy = new Date();
  const fechaFormateada = hoy.toISOString().split("T")[0];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const veterinarios = await countVeterinarios();
        setNumeroVeterinarios(veterinarios);
        const propietarios = await countPropietarios();
        setNumeroPropietarios(propietarios);
        const mascotas = await countMascotas();
        setNumeroMascotas(mascotas);
        const citas = await countCitas(fechaFormateada);
        setNumeroCitasHoy(citas);
        const citasHoy = await getCitasByFecha(fechaFormateada);
        setCitasRecientes(Array.isArray(citasHoy) ? citasHoy : []);
      } catch (error) {
        console.error("Error al cargar estadísticas del dashboard:", error);
      }
    };
    fetchStats();
  }, [codigoUsuario, fechaFormateada]);

  const getBadge = (estado) => {
    switch (estado?.toLowerCase()) {
      case "completada":
        return "badge-green";
      case "pendiente":
        return "badge-yellow";
      case "confirmada":
        return "badge-blue";
      case "cancelada":
        return "badge-red";
      default:
        return "badge-blue";
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <h2>Panel de Administración</h2>
      </div>

      <div className="admin-content">
        <div className="admin-greeting">
          <h1>¡Bienvenido, {nombre}!</h1>
          <p>{fechaHoy}</p>
        </div>

        {/* tarjetas de resumen */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <FaUserMd size={32} color="#5bb8f5" />
            <div>
              <h3>{NumeroVeterinarios}</h3>
              <p>Veterinarios</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <FaUsers size={32} color="#5bb8f5" />
            <div>
              <h3>{NumeroPropietarios}</h3>
              <p>Propietarios</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <FaPaw size={32} color="#5bb8f5" />
            <div>
              <h3>{NumeroMascotas}</h3>
              <p>Mascotas</p>
            </div>
          </div>
          <div className="admin-stat-card">
            <FaClipboardList size={32} color="#5bb8f5" />
            <div>
              <h3>{NumeroCitasHoy}</h3>
              <p>Citas de hoy</p>
            </div>
          </div>
        </div>

        <div className="admin-section-card">
          <h3>
            <FaCalendarAlt size={16} color="#5bb8f5" /> Citas de hoy
          </h3>

          {citasRecientes.length === 0 ? (
            <p
              className="dashboard-empty"
              style={{ textAlign: "center", padding: "24px", color: "#4a6278" }}
            >
              No hay citas programadas para el día de hoy.
            </p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Veterinario</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citasRecientes.map((cita, index) => (
                  <tr key={index}>
                    <td>{cita.nombre_mascota}</td>
                    <td>{cita.nombre_veterinario}</td>
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

export default AdminDashboard;
