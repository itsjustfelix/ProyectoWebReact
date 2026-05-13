import "../Modal.css";
import React, { useState } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { updatePropietario } from "../../../services/propietarioService";

const ModalEditarPropietario = ({ propietario, onCerrar, onEditado }) => {
  const [form, setForm] = useState({
    cedula: propietario.cedula,
    nombreCompleto: propietario.nombre_completo,
    telefono: propietario.telefono,
    sexo: propietario.sexo,
    email: propietario.email,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await updatePropietario(form);
      onEditado();
    } catch (error) {
      setError("Error al editar el propietario");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPencilAlt /> Editar propietario
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group">
              <label>Cédula</label>
              <input
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="modal-form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Sexo</label>
              <select
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div className="modal-form-group modal-full">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
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

export default ModalEditarPropietario;
