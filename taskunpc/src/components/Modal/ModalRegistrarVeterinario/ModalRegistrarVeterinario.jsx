import React, { useState, useEffect } from "react";
import { FaTimes, FaUserMd } from "react-icons/fa";
import { saveVeterinario } from "../../../services/veterinarioService";
import { getEspecializaciones } from "../../../services/especializacionesService";
import "../Modal.css";

const ModalRegistrarVeterinario = ({ onCerrar, onGuardado }) => {
  const [especializaciones, setEspecializaciones] = useState([]);
  const [form, setForm] = useState({
    cedula: "",
    nombreCompleto: "",
    telefono: "",
    sexo: "",
    codigo_especialidad: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    const traerEspecializaciones = async () => {
      try {
        const respuesta = await getEspecializaciones();
        setEspecializaciones(
          Array.isArray(respuesta) ? respuesta : respuesta.data || [],
        );
      } catch (error) {
        console.error(
          "Error al traer especializaciones:",
          error.response?.data?.detail?.error?.message,
        );
      }
    };
    traerEspecializaciones();
  }, []);

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
      await saveVeterinario(form);
      onGuardado();
      onCerrar();
    } catch (error) {
      const detail = error.response?.data?.detail;
      if (Array.isArray(detail)) {
        setErrores(detail.map((err) => err.msg.replace("Value error, ", "")));
      } else {
        setErrores([
          "Error al registrar el veterinario: " + detail?.error?.message,
        ]);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaUserMd size={16} /> Registrar veterinario
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
                placeholder="Ej: Dr. Juan Pérez"
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

            <div className="modal-form-group">
              <label>Especialización</label>
              <select
                name="codigo_especialidad"
                value={form.codigo_especialidad}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                {especializaciones.map((esp) => (
                  <option key={esp.codigo} value={esp.codigo}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
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
              Guardar veterinario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarVeterinario;
