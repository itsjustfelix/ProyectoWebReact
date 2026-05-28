import React, { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { updateEspecie } from "../../../services/especieService";

const ModalEditarEspecie = ({ especie, onCerrar, onEditado }) => {
  const [nombre, setNombre] = useState(especie.nombre);
  const [error, setError] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await updateEspecie(especie.codigo, nombre);
      onEditado();
    } catch (error) {
      setError(
        "Error al editar la especie:",
        error.response?.data?.detail?.error?.message,
      );
      console.error(
        "Error al editar la especie:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPencilAlt /> Editar especie
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group modal-full">
              <label>Nombre de la especie</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setError("");
                }}
                required
              />
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

export default ModalEditarEspecie;
