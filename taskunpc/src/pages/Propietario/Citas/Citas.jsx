import React, { useState, useEffect, useCallback } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import "./Citas.css";
import {
  deleteCita,
  getCitasByPropietario,
} from "../../../services/citaService";
import RegistrarCita from "./RegistrarCita/RegistrarCita";
import { formatearFecha } from "../../../utils/FormatearFecha";
import { formatearHora } from "../../../utils/FormatearHora";
import ModalEliminarCita from "../../../components/Modal/ModalEliminarCita/ModalEliminarCita";
const Citas = () => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [registrarCita, setRegistrarCita] = useState(false);
  const [cancelarCita, setCancelarCita] = useState(null);

  const traerCitas = useCallback(async () => {
    try {
      setCargando(true);
      const datos = await getCitasByPropietario(codigoUsuario);
      setCitas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error(
        "Error al traer citas:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, [codigoUsuario]);
  const confirmarEliminar = (cita) => {
    setCancelarCita(cita);
  };
  useEffect(() => {
    if (codigoUsuario) traerCitas();
  }, [codigoUsuario, traerCitas]);

  const getBadge = (estado) => {
    switch (estado?.toLowerCase()) {
      case "pendiente":
        return "badge-yellow";
      case "Asistida":
        return "badge-green";
      case "cancelada":
        return "badge-red";
      case "No Asistio":
        return "badge-grey";
    }
  };

  const eliminarCita = async () => {
    try {
      await deleteCita(cancelarCita.codigo);
      setCancelarCita(null);
      traerCitas();
    } catch (error) {
      console.error(
        "Error al cancelar la cita:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  return (
    <>
      <div className="citas-topbar">
        <h2>Mis Citas</h2>
        <button
          className="citas-btn-agendar"
          onClick={() => setRegistrarCita(true)}
        >
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
              <table className="citas-table">
                <thead>
                  <tr>
                    <th>Mascota</th>
                    <th>Especializacion</th>
                    <th>Veterinario</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.codigo}>
                      <td>{cita.nombre_mascota}</td>
                      <td>{cita.nombre_especializacion}</td>
                      <td>{cita.nombre_veterinario}</td>
                      <td>{formatearFecha(cita.fecha)}</td>
                      <td>{formatearHora(cita.hora)}</td>
                      <td>
                        <span className={`badge ${getBadge(cita.estado_cita)}`}>
                          {cita.estado_cita}
                        </span>
                      </td>
                      <td>
                        {/**
                         * Renderizado condiciional: si el estado de la cita es pendiente (todavia no ha asistido a la cita)
                         * le aparece el boton de cancelar la cita, de resto no se le mostrara porque tendra un estado
                         * diferente.
                         */}
                        {cita.estado_cita === "Pendiente" && (
                          <button
                            className="btn-cancelar"
                            onClick={() => confirmarEliminar(cita)}
                          >
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {registrarCita && (
        <RegistrarCita
          onCerrar={() => setRegistrarCita(false)}
          onGuardado={() => traerCitas()}
        />
      )}
      {cancelarCita && (
        <ModalEliminarCita
          cita={cancelarCita}
          onCerrar={() => setCancelarCita(null)}
          onEliminado={eliminarCita}
        />
      )}
    </>
  );
};

export default Citas;
