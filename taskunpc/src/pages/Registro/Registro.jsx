import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";
import Logo from "../../components/Logo/Logo";
import { savePropietario } from "../../services/propietarioService";

const Registro = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [form, setForm] = useState({
    nombreCompleto: "",
    cedula: "",
    telefono: "",
    sexo: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.contraseña !== form.confirmarContraseña) {
      return setError("Las contraseñas no coinciden");
    }

    try {
      await savePropietario(form);

      setError("");
      setExito("¡Cuenta creada exitosamente! Redirigiendo...");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const msg =
        err.response?.data?.detail?.error?.message ||
        "Error al conectar con el servidor";
      setError(msg);
    }
  };

  return (
    <div className="registro-page">
      <div className="registro-card">
        <Logo />
        <h2>Crea tu cuenta</h2>
        <p className="registro-sub">
          Regístrate gratis y empieza a cuidar a tu mascota desde hoy
        </p>

        <form onSubmit={handleSubmit}>
          <div className="registro-grid">
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
                placeholder="Ej: Carlos Pérez"
              />
            </div>

            <div className="form-group">
              <label>Cédula</label>
              <input
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                required
                placeholder="Ej: 123456"
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
                placeholder="300..."
              />
            </div>

            <div className="form-group">
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

            <div className="form-group form-group-full">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Contraseña</label>
              <input
                type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label>Confirme la Contraseña</label>
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
          {exito && <p className="msg-exito">{exito}</p>}

          <button type="submit" className="registro-btn">
            Crear cuenta
          </button>
        </form>

        <div className="registro-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
