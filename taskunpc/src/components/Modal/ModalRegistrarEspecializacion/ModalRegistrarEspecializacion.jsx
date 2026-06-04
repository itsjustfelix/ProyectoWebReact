import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { saveEspecializacion } from "../../../services/especializacionesService";

const ModalRegistrarEspecializacion = ({ onCerrar, onGuardado }) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await saveEspecializacion({ nombre });
      onGuardado();
      onCerrar();
    } catch (error) {
      setError(
        "Error al registrar la especialización: " +
          error.response?.data?.detail?.error?.message,
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaStar /> Registrar especialización
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group modal-full">
              <label>Nombre de la especialización</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setError("");
                }}
                placeholder="Ej: Cardiología"
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
              Guardar especialización
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarEspecializacion;
