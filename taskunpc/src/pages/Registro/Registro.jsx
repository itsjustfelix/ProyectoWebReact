import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import "./Registro.css";
import Logo from "../../components/Logo/Logo";

const Registro = () => {
  const [form, setForm] = useState({
    nombreCompleto: "",
    cedula: "",
    telefono: "",
    sexo: "",
    correo: "",
    contrasena: "",
    confirmContrasena: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.contrasena !== form.confirmContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos del registro:", form);
    // aquí después conectamos con FastAPI
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
                placeholder="Ej: Carlos Pérez"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Cédula</label>
              <input
                type="text"
                name="cedula"
                placeholder="Ej: 1234567890"
                value={form.cedula}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                placeholder="Ej: 3001234567"
                value={form.telefono}
                onChange={handleChange}
                required
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
                placeholder="tucorreo@ejemplo.com"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                placeholder="Ingrese su contraseña"
                value={form.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-group-full">
              <label>Confirme la Contraseña</label>
              <input
                type="password"
                name="confirmContrasena"
                placeholder="Confirme su contraseña"
                value={form.confirmContrasena}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && (
            <p
              style={{
                color: "#c0392b",
                background: "#ffe5e5",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                marginTop: "16px",
              }}
            >
              {error}
            </p>
          )}
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
