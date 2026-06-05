import React, { useEffect, useState } from "react";
import { FaTimes, FaClipboardList, FaPaw } from "react-icons/fa";
import "./ModalVerConsulta.css";
import { formatearFecha } from "../../../utils/FormatearFecha";
import { getInfoMascotaByCodigo } from "../../../services/mascotasService";

const ModalVerConsulta = ({ consulta, onCerrar }) => {
  const [infoMascota, setInfoMascota] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const traerHistorial = async () => {
      try {
        setCargando(true);
        const info = await getInfoMascotaByCodigo(consulta.codigo_mascota);
        setInfoMascota(info);
      } catch (err) {
        console.error(
          "Error al traer historial:",
          err.response?.data?.detail?.error?.message || err.message,
        );
      } finally {
        setCargando(false);
      }
    };

    if (consulta?.codigo_mascota) {
      traerHistorial();
    }
  }, [consulta?.codigo_mascota]);

  if (!consulta) return null;

  return (
    <div className="ver-consulta-overlay" onClick={onCerrar}>
      <div className="ver-consulta-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ver-consulta-header">
          <h3>
            <FaClipboardList size={15} color="#5bb8f5" />
            Detalle de consulta —{" "}
            {consulta.fecha ? formatearFecha(consulta.fecha) : "Sin fecha"}
          </h3>
          <button className="ver-consulta-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <div className="ver-consulta-body">
          {cargando || !infoMascota ? (
            <div className="ver-consulta-cargando">
              Cargando datos de la mascota...
            </div>
          ) : (
            <div className="ver-consulta-mascota">
              <div className="ver-consulta-avatar">
                {infoMascota.link_imagen ? (
                  <img
                    src={infoMascota.link_imagen}
                    alt={infoMascota.nombre_mascota}
                  />
                ) : (
                  <FaPaw size={22} color="#2e9cdb" />
                )}
              </div>
              <div className="ver-consulta-mascota-datos">
                <p>
                  <strong>{infoMascota.nombre_mascota}</strong>
                </p>
                <p>
                  Especie: <strong>{infoMascota.nombre_especie || "—"}</strong>
                </p>
                <p>
                  Raza: <strong>{infoMascota.nombre_raza || "—"}</strong>
                </p>
                <p>
                  Propietario:{" "}
                  <strong>{infoMascota.nombre_propietario || "—"}</strong>
                </p>
              </div>
            </div>
          )}

          <hr className="ver-consulta-divider" />

          {/* detalle de la consulta */}
          <div className="ver-consulta-seccion">
            <h4>
              <FaClipboardList size={12} /> Datos de la consulta
            </h4>
            <div className="ver-consulta-campo">
              <label>Descripcion</label>
              <p className={!consulta.descripcion ? "vacio" : ""}>
                {consulta.descripcion || "Sin observaciones adicionales"}
              </p>
            </div>

            <div className="ver-consulta-campo">
              <label>Diagnóstico</label>
              <p>
                {consulta.diagnostico || (
                  <span className="vacio">Sin registrar</span>
                )}
              </p>
            </div>

            <div className="ver-consulta-campo">
              <label>Tratamiento</label>
              <p>
                {consulta.tratamiento || (
                  <span className="vacio">Sin registrar</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* pie */}
        <div className="ver-consulta-footer">
          <button className="btn-ver-cerrar" onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerConsulta;
