import "../Modal.css";
import React from "react";
import { FaTimes } from "react-icons/fa";

const ModalEliminarPropietario = ({ propietario, onCerrar, onEliminado }) => {
  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>¿Eliminar propietario?</h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <p className="modal-texto">
          ¿Estás seguro que deseas eliminar a
          <strong>{propietario.nombre_completo}</strong>? Esta acción
          desactivará su acceso al sistema.
        </p>

        <div className="modal-acciones">
          <button className="btn-cancelar-modal" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn-eliminar-confirmar" onClick={onEliminado}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarPropietario;
