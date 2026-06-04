import React, { useState, useEffect, useCallback } from "react";
import "./Mascota.css";
import { getMascotas } from "../../../services/mascotasService";
import { deleteMascota } from "../../../services/mascotasService";
import { FaEdit, FaTrash, FaPlus, FaPaw } from "react-icons/fa";
import ModalRegistrarMascota from "../../../components/Modal/ModalRegistrarMascota/ModalRegistrarMascota";
import ModalEditarMascota from "../../../components/Modal/ModalEditarMascota/EditarMascota";
import ModalEliminarMascota from "../../../components/Modal/ModalEliminarMascota/EliminarMascota";

const MascotaAdmin = () => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [mascotaAEditar, setMascotaAEditar] = useState(null);
  const [mascotaAEliminar, setMascotaAEliminar] = useState(null);

  const traerMascotas = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getMascotas();
      setMascotas(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer mascotas:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarMascota = async () => {
    try {
      await deleteMascota(mascotaAEliminar.codigo);
      setMascotaAEliminar(null);
      traerMascotas();
    } catch (error) {
      console.error(
        "Error al eliminar mascota:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerMascotas();
  }, [traerMascotas]);

  return (
    <>
      <div className="mascota-admin-topbar">
        <h2>Mascotas</h2>
        <button
          className="mascota-admin-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar mascota
        </button>
      </div>

      <div className="mascota-admin-content">
        <div className="mascota-admin-section-card">
          <h3>
            <FaPaw size={16} color="#5bb8f5" /> Mascotas registradas
          </h3>

          {cargando ? (
            <p className="mascota-admin-empty">Cargando mascotas...</p>
          ) : mascotas.length === 0 ? (
            <p className="mascota-admin-empty">No hay mascotas registradas.</p>
          ) : (
            <table className="mascota-admin-table">
              <thead>
                <tr>
                  <th>Mascota</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Propietario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mascotas.map((mascota) => (
                  <tr key={mascota.codigo}>
                    <td>
                      <div className="mascota-admin-nombre-cel">
                        <div className="mascota-admin-avatar">
                          {mascota.link_imagen ? (
                            <img
                              src={mascota.link_imagen}
                              alt={mascota.nombre}
                            />
                          ) : (
                            <FaPaw size={16} color="#5bb8f5" />
                          )}
                        </div>
                        {mascota.nombre}
                      </div>
                    </td>
                    <td>{mascota.nombre_especie}</td>
                    <td>{mascota.nombre_raza}</td>
                    <td>{mascota.nombre_propietario}</td>
                    <td>
                      <div className="mascota-admin-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setMascotaAEditar(mascota)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setMascotaAEliminar(mascota)}
                        >
                          <FaTrash size={12} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalRegistrar && (
        <ModalRegistrarMascota
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerMascotas}
        />
      )}

      {mascotaAEditar && (
        <ModalEditarMascota
          mascota={mascotaAEditar}
          onCerrar={() => setMascotaAEditar(null)}
          onEditado={() => {
            setMascotaAEditar(null);
            traerMascotas();
          }}
        />
      )}

      {mascotaAEliminar && (
        <ModalEliminarMascota
          mascota={mascotaAEliminar}
          onCerrar={() => setMascotaAEliminar(null)}
          onEliminado={eliminarMascota}
        />
      )}
    </>
  );
};

export default MascotaAdmin;
