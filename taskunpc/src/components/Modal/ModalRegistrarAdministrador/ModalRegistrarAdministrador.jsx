import React, { useState } from "react";
import { FaTimes, FaUserShield } from "react-icons/fa";
import "../Modal.css";
import { saveAdministrador } from "../../../services/administradorService";

const ModalRegistrarAdministrador = ({ onCerrar, onGuardado }) => {
  const [form, setForm] = useState({
    cedula: "",
    nombreCompleto: "",
    telefono: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errores, setErrores] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores.length) setErrores([]);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (form.contraseña !== form.confirmarContraseña) {
      setErrores(["Las contraseñas no coinciden"]);
      return;
    }
    try {
      await saveAdministrador(form);
      onGuardado();
      onCerrar();
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setErrores(detail.map((err) => err.msg.replace("Value error, ", "")));
      } else {
        setErrores([
          "Error al registrar el administrador: " + detail?.error?.message,
        ]);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaUserShield size={16} /> Registrar administrador
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
                type="number"
                inputMode="numeric"
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
                type="number"
                inputMode="numeric"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej: 3001234567"
                required
              />
            </div>

            <div className="modal-form-group">
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
              Guardar administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarAdministrador;
