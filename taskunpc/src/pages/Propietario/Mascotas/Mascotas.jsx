import React, { useState, useEffect } from "react";
import { FaPaw, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getMascotasByPropietario } from "../../../services/mascotasService";
import RegistrarMascota from "./RegistrarMascota/RegistrarMascota"; // Ajusta la ruta si es necesario
import "./Mascotas.css";

const Mascotas = () => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para el modal

  const traerMascotas = async () => {
    try {
      setCargando(true);
      const datos = await getMascotasByPropietario(codigoUsuario);
      setMascotas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al traer mascotas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (codigoUsuario) traerMascotas();
  }, [codigoUsuario]);

  const getIconoEspecie = (especie) => {
    const iconos = {
      canino: "🐶",
      felino: "🐱",
      ave: "🐦",
      reptil: "🦎",
      roedor: "🐹",
    };
    return iconos[especie?.toLowerCase()] || "🐾";
  };

  return (
    <>
      <div className="mascotas-topbar">
        <h2>Mis Mascotas</h2>
        <button
          className="mascotas-btn-agregar"
          onClick={() => setModalAbierto(true)}
        >
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
            {mascotas.map((mascota) => (
              <div className="mascota-card" key={mascota.codigo || mascota.id}>
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

      {modalAbierto && (
        <RegistrarMascota
          onCerrar={() => setModalAbierto(false)}
          onGuardado={traerMascotas}
        />
      )}
    </>
  );
};

export default Mascotas;
