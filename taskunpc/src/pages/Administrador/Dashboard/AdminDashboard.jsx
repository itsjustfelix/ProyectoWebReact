import React from "react";
import {
  FaUserMd,
  FaUsers,
  FaPaw,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import "./Dashboard.css";

const AdminDashboard = () => {
  const nombre = localStorage.getItem("nombre") || "Administrador";

  const fechaHoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /*
   * datos estaticos mientras se conecta con el backend
   * cuando se conecte se reemplazaran por llamadas a la api
   */
  const stats = [
    {
      icono: <FaUserMd color="#5bb8f5" size={20} />,
      label: "Veterinarios",
      valor: 0,
    },
    {
      icono: <FaUsers color="#5bb8f5" size={20} />,
      label: "Propietarios",
      valor: 0,
    },
    { icono: <FaPaw color="#5bb8f5" size={20} />, label: "Mascotas", valor: 0 },
    {
      icono: <FaCalendarAlt color="#5bb8f5" size={20} />,
      label: "Citas hoy",
      valor: 0,
    },
  ];

  /*
   * citas recientes estaticas de ejemplo
   * se reemplazaran por datos reales del backend
   */
  const citasRecientes = [
    {
      mascota: "Luna",
      propietario: "Carlos Pérez",
      veterinario: "Dra. Gómez",
      hora: "08:00",
      estado: "Completada",
    },
    {
      mascota: "Michi",
      propietario: "Ana Torres",
      veterinario: "Dr. Ramos",
      hora: "09:00",
      estado: "Pendiente",
    },
    {
      mascota: "Rocky",
      propietario: "Juan Díaz",
      veterinario: "Dra. Gómez",
      hora: "10:00",
      estado: "Confirmada",
    },
  ];

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
          {stats.map((stat, index) => (
            <div className="admin-stat-card" key={index}>
              <div className="admin-stat-icon">{stat.icono}</div>
              <div className="admin-stat-label">{stat.label}</div>
              <div className="admin-stat-value">{stat.valor}</div>
            </div>
          ))}
        </div>

        {/* tabla de citas recientes del dia */}
        <div className="admin-section-card">
          <h3>
            <FaCalendarAlt size={16} color="#5bb8f5" /> Citas de hoy
          </h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mascota</th>
                <th>Propietario</th>
                <th>Veterinario</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {citasRecientes.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.mascota}</td>
                  <td>{cita.propietario}</td>
                  <td>{cita.veterinario}</td>
                  <td>{cita.hora}</td>
                  <td>
                    <span className={`badge ${getBadge(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tabla de veterinarios activos */}
        <div className="admin-section-card">
          <h3>
            <FaUserMd size={16} color="#5bb8f5" /> Veterinarios activos
          </h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Especialización</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", color: "#4a6278" }}
                >
                  Conectando con el backend...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
