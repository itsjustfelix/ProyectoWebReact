import React from "react";
import { FaTimes } from "react-icons/fa";
import "../Modal.css";

const ModalEliminarAdministrador = ({
  administrador,
  onCerrar,
  onEliminado,
}) => {
  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>¿Eliminar administrador?</h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <p className="modal-texto">
          ¿Estás seguro que deseas eliminar al administrador{" "}
          <strong>{administrador.nombre_completo}</strong>? Esta acción
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

export default ModalEliminarAdministrador;
