import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ModalRefrescarSesion.css";
import { refreshToken } from "../../services/loginService";
import { CgSandClock } from "react-icons/cg";

const ModalRefrescarSesion = ({ onCerrar }) => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  /* llama al endpoint de refresh y guarda el nuevo token */
  const handleRefrescar = async () => {
    setCargando(true);
    setError("");
    try {
      const respuesta = await refreshToken();
      localStorage.setItem("token", respuesta.token);
      onCerrar();
    } catch {
      setError(
        "No se pudo renovar la sesión. Por favor inicia sesión de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  };

  /* cierra sesión y manda al login */
  const handleCerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
    onCerrar();
  };

  return (
    <div className="modal-sesion-overlay">
      <div className="modal-sesion">
        <div className="modal-sesion-icono">
          <CgSandClock />
        </div>
        <h3>Tu sesión ha expirado</h3>
        <p>
          Por seguridad, tu sesión se cerró automáticamente. ¿Deseas continuar
          sin necesidad de volver a iniciar sesión?
        </p>

        {error && (
          <p className="msg-error" style={{ marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <div className="modal-sesion-acciones">
          <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
          <button
            className="btn-refrescar"
            onClick={handleRefrescar}
            disabled={cargando}
          >
            {cargando ? "Renovando..." : "Continuar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRefrescarSesion;
