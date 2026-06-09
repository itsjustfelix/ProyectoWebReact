import React, { useState } from "react";
import { FaPaw, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { saveEspecie } from "../../../services/especieService";

const ModalRegistrarEspecie = ({ onCerrar, onGuardado }) => {
  const [nombre, setNombre] = useState("");
  const [errores, setErrores] = useState([]);

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await saveEspecie({ nombre });
      onGuardado();
      onCerrar();
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setErrores(detail.map((err) => err.msg.replace("Value error, ", "")));
      } else {
        setErrores([
          "Error al registrar la especie: " + detail?.error?.message,
        ]);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPaw /> Registrar especie
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
                  if (errores.length) setErrores([]);
                }}
                placeholder="Ej: Canino"
                required
              />
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
              Guardar especie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarEspecie;
