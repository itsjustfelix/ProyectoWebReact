import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { updateRaza } from "../../../services/razaService";
import { getEspecies } from "../../../services/especieService";

const ModalEditarRaza = ({ raza, onCerrar, onEditado }) => {
  const [especies, setEspecies] = useState([]);
  const [form, setForm] = useState({
    codigo: raza.codigo,
    nombre: raza.nombre,
    codigo_especie: raza.codigo_especie || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const traerEspecies = async () => {
      try {
        const respuesta = await getEspecies();
        setEspecies(Array.isArray(respuesta) ? respuesta : []);
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
    if (error) setError("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await updateRaza(form);
      onEditado();
    } catch (error) {
      setError(
        "Error al editar la raza: " +
          error.response?.data?.detail?.error?.message,
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPencilAlt /> Editar raza
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

          {error && <p className="msg-error">{error}</p>}

          <div className="modal-acciones">
            <button
              type="button"
              className="btn-cancelar-modal"
              onClick={onCerrar}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarRaza;
