import React, { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaStethoscope } from "react-icons/fa";
import "./Citas.css";
import {
  getCitasByVeterinario,
  CitaAsistida,
} from "../../../services/citaService";
import { formatearHora } from "../../../utils/FormatearHora";
import ModalAtenderCita from "./ModalAtenderCita/ModalAtenderCita";

const Citas = () => {
  const cedulaVeterinario = localStorage.getItem("codigo_usuario");

  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [citaAAtender, setCitaAAtender] = useState(null);

  const fechaLegible = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  /* trae las citas del día del veterinario */
  const traerCitas = useCallback(async () => {
    try {
      setCargando(true);
      const citas = await getCitasByVeterinario(cedulaVeterinario);
      setCitas(citas);
    } catch (error) {
      console.error(
        "Error al traer citas:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, [cedulaVeterinario]);

  useEffect(() => {
    if (cedulaVeterinario) traerCitas();
  }, [cedulaVeterinario, traerCitas]);

  /* devuelve la clase del badge según el estado */
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
      <div className="vet-citas-topbar">
        <h2>Citas de hoy</h2>
        <span className="vet-citas-fecha">{fechaLegible}</span>
      </div>

      <div className="vet-citas-content">
        <div className="vet-citas-section-card">
          <h3>
            <FaCalendarAlt size={16} color="#5bb8f5" /> Agenda del día
          </h3>

          {cargando ? (
            <p className="vet-citas-empty">Cargando citas...</p>
          ) : citas.length === 0 ? (
            <p className="vet-citas-empty">
              No tienes citas programadas para hoy.
            </p>
          ) : (
            <table className="vet-citas-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Hora</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.codigo}>
                    <td>{cita.nombre_mascota}</td>
                    <td>{formatearHora(cita.hora)}</td>
                    <td>
                      <span className={`badge ${getBadge(cita.estado_cita)}`}>
                        {cita.estado_cita}
                      </span>
                    </td>
                    <td>
                      {cita.estado_cita === "Pendiente" && (
                        <button
                          className="btn-atender"
                          onClick={() => setCitaAAtender(cita)}
                        >
                          <FaStethoscope size={12} /> Atender
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {citaAAtender && (
        <ModalAtenderCita
          cita={citaAAtender}
          onCerrar={() => setCitaAAtender(null)}
          onAtendida={() => {
            CitaAsistida(citaAAtender.codigo);
            setCitaAAtender(null);
            traerCitas();
          }}
        />
      )}
    </>
  );
};

export default Citas;
