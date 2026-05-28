import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
import { login } from "../../services/loginService";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rutas = {
    1: "/admin",
    2: "/veterinario",
    3: "/propietario",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = await login(email, password);

      localStorage.setItem("token", datos.token);
      localStorage.setItem("rol", datos.rol);
      localStorage.setItem("nombre", datos.nombre);
      localStorage.setItem("codigo_usuario", datos.codigo_usuario);

      navigate(rutas[datos.rol]);
    } catch (error) {
      const mensajeError =
        error.response?.data?.detail?.error?.message || "Error al conectar con el servidor";
      setError(mensajeError);
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
          {error && <p className="msg-error">{error}</p>}
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
