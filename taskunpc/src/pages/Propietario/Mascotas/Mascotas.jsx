import React, { useState, useEffect } from "react";
import { FaPaw, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./Mascotas.css";

const Mascotas = () => {
  const token = localStorage.getItem("token");
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const traerMascotas = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:8000/mascotas/propietario/${codigoUsuario}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const datos = await respuesta.json();
        setMascotas(datos);
      } catch (error) {
        console.error("Error al traer mascotas:", error);
      } finally {
        setCargando(false);
      }
    };
    traerMascotas();
  }, [token, codigoUsuario]);

  const getIconoEspecie = (especie) => {
    switch (especie?.toLowerCase()) {
      case "canino":
        return "🐶";
      case "felino":
        return "🐱";
      case "ave":
        return "🐦";
      case "reptil":
        return "🦎";
      case "roedor":
        return "🐹";
      default:
        return "🐾";
    }
  };

  return (
    <>
      <div className="mascotas-topbar">
        <h2>Mis Mascotas</h2>
        <button className="mascotas-btn-agregar">
          <FaPlus size={14} /> Agregar mascota
        </button>
      </div>

      <div className="mascotas-content">
        {cargando ? (
          <p className="mascotas-empty">Cargando mascotas...</p>
        ) : mascotas.length === 0 ? (
          <div className="mascotas-empty">
            <FaPaw size={40} color="#c5e8fb" />
            <p>No tienes mascotas registradas aún.</p>
          </div>
        ) : (
          <div className="mascotas-grid">
            {mascotas.map((mascota, index) => (
              <div className="mascota-card" key={index}>
                <div className="mascota-avatar">
                  {mascota.link_imagen ? (
                    <img src={mascota.link_imagen} alt={mascota.nombre} />
                  ) : (
                    getIconoEspecie(mascota.nombre_especie)
                  )}
                </div>
                <div className="mascota-nombre">{mascota.nombre}</div>
                <div className="mascota-info">
                  {mascota.nombre_especie} — {mascota.nombre_raza}
                </div>
                <div className="mascota-acciones">
                  <button className="btn-editar">
                    <FaEdit size={12} /> Editar
                  </button>
                  <button className="btn-eliminar">
                    <FaTrash size={12} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Mascotas;
