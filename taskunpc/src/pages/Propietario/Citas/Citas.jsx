import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import "./Citas.css";
import { getCitasByPropietario } from "../../../services/citaService";

const Citas = () => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const traerCitas = async () => {
      try {
        const datos = await getCitasByPropietario(codigoUsuario);
        setCitas(datos);
      } catch (error) {
        console.error("Error al traer citas:", error);
      } finally {
        setCargando(false);
      }
    };

    if (codigoUsuario) traerCitas();
  }, [codigoUsuario]);

  const estilosBadge = {
    confirmada: "badge-blue",
    pendiente: "badge-yellow",
    completada: "badge-green",
    cancelada: "badge-red",
  };

  return (
    <>
      <div className="citas-topbar">
        <h2>Mis Citas</h2>
        <button className="citas-btn-agendar">
          <FaPlus size={14} /> Agendar cita
        </button>
      </div>

      <div className="citas-content">
        <div className="citas-section-card">
          <h3>
            <FaCalendarAlt size={16} color="#5bb8f5" /> Mis citas
          </h3>

          {cargando ? (
            <p className="citas-empty">Cargando citas...</p>
          ) : citas.length === 0 ? (
            <p className="citas-empty">No tienes citas agendadas.</p>
          ) : (
            <div className="table-responsive">
              {" "}
              {/* Recomendado para móvil */}
              <table className="citas-table">
                <thead>
                  <tr>
                    <th>Mascota</th>
                    <th>Veterinario</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.id_cita || cita.codigo_cita}>
                      <td>{cita.nombre_mascota}</td>
                      <td>{cita.nombre_veterinario}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>
                        <span
                          className={`badge ${estilosBadge[cita.estado_cita?.toLowerCase()] || "badge-blue"}`}
                        >
                          {cita.estado_cita}
                        </span>
                      </td>
                      <td>
                        <button className="btn-cancelar">Cancelar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Citas;
