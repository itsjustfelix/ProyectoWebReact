import React, { useState, useEffect } from "react";
import { FaTimes, FaStethoscope, FaPaw, FaClipboardList } from "react-icons/fa";
import "./ModalAtenderCita.css";
import {
  saveConsulta,
  getConsultaByCodigoMascota,
} from "../../../../services/consultaService";
import { getInfoMascotaByCodigo } from "../../../../services/mascotasService";
import { formatearFecha } from "../../../../utils/FormatearFecha";

const ModalAtenderCita = ({ cita, onCerrar, onAtendida }) => {
  const [form, setForm] = useState({
    diagnostico: "",
    tratamiento: "",
    descripcion: "",
  });

  const [historial, setHistorial] = useState([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(true);
  const [infoMascota, setInfoMascota] = useState(null);

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const traerHistorial = async () => {
      try {
        setCargandoHistorial(true);
        const datos = await getConsultaByCodigoMascota(cita.codigo_mascota);
        setHistorial(datos);
        const info = await getInfoMascotaByCodigo(cita.codigo_mascota);
        setInfoMascota(info);
      } catch (err) {
        console.error(
          "Error al traer historial:",
          err.response?.data?.detail?.error?.message,
        );
      } finally {
        setCargandoHistorial(false);
      }
    };

    if (cita.codigo_mascota) traerHistorial();
  }, [cita.codigo_mascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (guardando) return;

    if (!form.diagnostico.trim() || !form.tratamiento.trim()) {
      setError("El diagnóstico y el tratamiento son obligatorios.");
      return;
    }

    setGuardando(true);
    try {
      await saveConsulta({
        fecha: cita.fecha,
        descripcion: form.descripcion,
        diagnostico: form.diagnostico,
        tratamiento: form.tratamiento,
        codigo_Mascotas: cita.codigo_mascota,
        cedula_Veterinario: cita.cedula_veterinario,
        codigo_cita: cita.codigo,
        codigo_especializacion: cita.codigo_especializacion,
      });
      onAtendida();
      onCerrar();
    } catch (err) {
      setError(
        "Error al registrar la consulta: " +
          (err.response?.data?.detail?.error?.message || "Intenta de nuevo."),
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="atender-overlay" onClick={onCerrar}>
      <div className="atender-modal" onClick={(e) => e.stopPropagation()}>
        {/* cabecera */}
        <div className="atender-header">
          <h3>
            <FaStethoscope size={16} /> Atender cita — {cita.nombre_mascota}
          </h3>
          <button className="atender-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <div className="atender-body">
          <div className="atender-col-form">
            <h4>
              <FaStethoscope size={13} color="#5bb8f5" /> Registrar consulta
            </h4>

            <form id="form-consulta" onSubmit={handleGuardar}>
              <div className="atender-form-group">
                <div className="atender-form-group">
                  <label>Descripción de la consulta *</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe la consulta"
                  />
                </div>

                <label>Diagnóstico *</label>
                <textarea
                  name="diagnostico"
                  value={form.diagnostico}
                  onChange={handleChange}
                  placeholder="Describe el diagnóstico del paciente..."
                  required
                />
              </div>

              <div className="atender-form-group">
                <label>Tratamiento *</label>
                <textarea
                  name="tratamiento"
                  value={form.tratamiento}
                  onChange={handleChange}
                  placeholder="Detalla el tratamiento a seguir..."
                  required
                />
              </div>

              {error && <p className="msg-error">{error}</p>}
            </form>
          </div>

          <div className="atender-col-info">
            <div>
              <h4>
                <FaPaw size={13} color="#5bb8f5" /> Información de la mascota
              </h4>
              <div className="atender-mascota-chip">
                <div className="atender-mascota-avatar">
                  {infoMascota?.link_imagen ? (
                    <img
                      src={infoMascota.link_imagen}
                      alt={cita.nombre_mascota}
                    />
                  ) : (
                    <FaPaw size={24} color="#2e9cdb" />
                  )}
                </div>
                <div className="atender-mascota-datos">
                  <p>
                    <strong>{cita.nombre_mascota}</strong>
                  </p>
                  <p>
                    Especie:{" "}
                    <strong>{infoMascota?.nombre_especie || "—"}</strong>
                  </p>
                  <p>
                    Raza: <strong>{infoMascota?.nombre_raza || "—"}</strong>
                  </p>
                  <p>
                    Propietario:{" "}
                    <strong>{infoMascota?.nombre_propietario}</strong>
                  </p>
                </div>
              </div>
            </div>

            <hr className="atender-divider" />

            <div>
              <h4>
                <FaClipboardList size={13} color="#5bb8f5" /> Consultas
                anteriores
              </h4>

              {cargandoHistorial ? (
                <p className="atender-cargando">Cargando historial...</p>
              ) : historial.length === 0 ? (
                <p className="atender-historial-empty">
                  Esta mascota no tiene consultas previas registradas.
                </p>
              ) : (
                <div className="atender-historial-lista">
                  {historial.map((consulta) => (
                    <div
                      className="atender-historial-item"
                      key={consulta.codigo}
                    >
                      <div className="hist-fecha">
                        {formatearFecha(consulta.fecha)} — Dr.{" "}
                        {consulta.nombre_veterinario}
                      </div>
                      <p className="hist-campo">
                        <span>Diagnóstico:</span> {consulta.diagnostico}
                      </p>
                      <p className="hist-campo">
                        <span>Tratamiento:</span> {consulta.tratamiento}
                      </p>
                      {consulta.medicamentos && (
                        <p className="hist-campo">
                          <span>Medicamentos:</span> {consulta.medicamentos}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="atender-footer">
          <button className="btn-atender-cancelar" onClick={onCerrar}>
            Cancelar
          </button>
          <button
            className="btn-atender-guardar"
            form="form-consulta"
            type="submit"
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Registrar consulta"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAtenderCita;
