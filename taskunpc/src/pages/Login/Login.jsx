import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          contraseña: password,
        }),
      });

      const datos = await respuesta.json();
      if (respuesta.ok) {
        localStorage.setItem("token", datos.token);
        localStorage.setItem("rol", datos.rol);
      }

      if (datos.rol === "1") navigate("/admin");
      if (datos.rol === "2") navigate("/veterinario");
      if (datos.rol === "3") navigate("/propietario");
      else {
        setError(datos.detail || "Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error al conectar con el servidor ->", error.value);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Logo />

        <h2>Bienvenido de nuevo</h2>
        <p className="login-sub">Ingresa tus datos para acceder al sistema</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <div className="login-footer">
          ¿Necesitas una cuenta? <Link to="/registro">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
