import React, { useState } from "react";
import { FaTimes, FaUsers } from "react-icons/fa";
import "../Modal.css";
import { savePropietario } from "../../../services/propietarioService";

const ModalRegistrarPropietario = ({ onCerrar, onGuardado }) => {
  const [form, setForm] = useState({
    cedula: "",
    nombreCompleto: "",
    telefono: "",
    sexo: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (form.contraseña !== form.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await savePropietario(form);
      onGuardado();
      onCerrar();
    } catch (error) {
      setError("Error al registrar el propietario...");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaUsers /> Registrar propietario
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
                placeholder="Ej: 1234567890"
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                placeholder="Ej: Carlos Pérez"
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
                placeholder="Ej: 3001234567"
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
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmarContraseña"
                value={form.confirmarContraseña}
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
              Guardar propietario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarPropietario;
