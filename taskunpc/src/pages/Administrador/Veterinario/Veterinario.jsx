import React, { useState, useEffect, useCallback } from "react";
import { FaUserMd, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./Veterinarios.css";
import ModalEditarVeterinario from "../../../components/Modal/ModalEditarVeterinario/ModalEditarVeterinario";
import ModalRegistrarVeterinario from "../../../components/Modal/ModalRegistrarVeterinario/ModalRegistrarVeterinario";
import ModalEliminarVeterinario from "../../../components/Modal/ModalEliminarVeterinario/ModalEliminarVeterinario";
import {
  getVeterinarios,
  deleteVeterinario,
} from "../../../services/veterinarioService";

const Veterinarios = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [vetAEditar, setVetAEditar] = useState(null);
  const [vetAEliminar, setVetAEliminar] = useState(null);

  /*
   * trae la lista de veterinarios activos del backend
   * se usa useCallback para evitar que el useEffect entre en loop
   */
  const traerVeterinarios = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getVeterinarios();
      setVeterinarios(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer veterinarios:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  /*
   * elimina el veterinario seleccionado en el backend
   * luego cierra el modal y refresca la lista
   */
  const eliminarVeterinario = async () => {
    try {
      await deleteVeterinario(vetAEliminar.cedula);
      setVetAEliminar(null);
      traerVeterinarios();
    } catch (error) {
      console.error(
        "Error al eliminar veterinario:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerVeterinarios();
  }, [traerVeterinarios]);

  return (
    <>
      <div className="vet-topbar">
        <h2>Veterinarios</h2>
        <button
          className="vet-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar veterinario
        </button>
      </div>

      <div className="vet-content">
        <div className="vet-section-card">
          <h3>
            <FaUserMd size={16} color="#5bb8f5" /> Veterinarios registrados
          </h3>

          {cargando ? (
            <p className="vet-empty">Cargando veterinarios...</p>
          ) : veterinarios.length === 0 ? (
            <p className="vet-empty">No hay veterinarios registrados.</p>
          ) : (
            <table className="vet-table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Especialización</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {veterinarios.map((vet) => (
                  <tr key={vet.cedula}>
                    <td>{vet.cedula}</td>
                    <td>{vet.nombre_completo}</td>
                    <td>{vet.nombre_especializacion}</td>
                    <td>{vet.telefono}</td>
                    <td>
                      <div className="vet-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setVetAEditar(vet)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setVetAEliminar(vet)}
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
        <ModalRegistrarVeterinario
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerVeterinarios}
        />
      )}

      {vetAEditar && (
        <ModalEditarVeterinario
          veterinario={vetAEditar}
          onCerrar={() => setVetAEditar(null)}
          onEditado={() => {
            setVetAEditar(null);
            traerVeterinarios();
          }}
        />
      )}

      {vetAEliminar && (
        <ModalEliminarVeterinario
          veterinario={vetAEliminar}
          onCerrar={() => setVetAEliminar(null)}
          onEliminado={eliminarVeterinario}
        />
      )}
    </>
  );
};

export default Veterinarios;
