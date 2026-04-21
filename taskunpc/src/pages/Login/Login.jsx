import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
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
