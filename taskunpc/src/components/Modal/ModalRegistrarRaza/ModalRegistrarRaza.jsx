import React, { useState, useEffect } from "react";
import { FaDog, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { saveRaza } from "../../../services/razaService";
import { getEspecies } from "../../../services/especieService";

const ModalRegistrarRaza = ({ onCerrar, onGuardado }) => {
  const [especies, setEspecies] = useState([]);
  const [form, setForm] = useState({ nombre: "", codigo_especie: "" });
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    const traerEspecies = async () => {
      try {
        const respuesta = await getEspecies();
        setEspecies(
          Array.isArray(respuesta) ? respuesta : respuesta.data || [],
        );
      } catch (error) {
        console.error(
          "Error al traer especies:",
          error.response?.data?.detail?.error?.message,
        );
      }
    };
    traerEspecies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores.length) setErrores([]);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await saveRaza(form);
      onGuardado();
      onCerrar();
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setErrores(detail.map((err) => err.msg.replace("Value error, ", "")));
      } else {
        setErrores(["Error al registrar la raza: " + detail?.error?.message]);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaDog /> Registrar raza
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group modal-full">
              <label>Nombre de la raza</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Labrador"
                required
              />
            </div>

            <div className="modal-form-group modal-full">
              <label>Especie</label>
              <select
                name="codigo_especie"
                value={form.codigo_especie}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una especie...</option>
                {especies.map((esp) => (
                  <option key={esp.codigo} value={esp.codigo}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errores.length > 0 && (
            <ul className="msg-error">
              {errores.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          )}

          <div className="modal-acciones">
            <button
              type="button"
              className="btn-cancelar-modal"
              onClick={onCerrar}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar raza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarRaza;
