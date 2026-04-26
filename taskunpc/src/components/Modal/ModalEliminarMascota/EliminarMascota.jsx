import React from "react";
import { FaTimes } from "react-icons/fa";
import "../Modal.css";

const ModalEliminarMascota = ({ mascota, onCerrar, onEliminado }) => {
  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>¿Eliminar mascota?</h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <p className="modal-texto">
          ¿Estás seguro que deseas eliminar a <strong>{mascota.nombre}</strong>?
          Esta acción no se puede deshacer.
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

export default ModalEliminarMascota;
