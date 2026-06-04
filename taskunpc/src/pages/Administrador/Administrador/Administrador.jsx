import React, { useState, useEffect, useCallback } from "react";
import "./Administrador.css";
import {
  getAdministradores,
  deleteAdministrador,
} from "../../../services/administradorService";
import { FaEdit, FaTrash, FaPlus, FaUserShield } from "react-icons/fa";
import ModalRegistrarAdministrador from "../../../components/Modal/ModalRegistrarAdministrador/ModalRegistrarAdministrador";
import ModalEditarAdministrador from "../../../components/Modal/ModalEditarAdministrador/ModalEditarAdministrador";
import ModalEliminarAdministrador from "../../../components/Modal/ModalEliminarAdministrador/ModalEliminarAdministrador";

const Administrador = () => {
  const [administradores, setAdministradores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [admAEditar, setAdmAEditar] = useState(null);
  const [admAEliminar, setAdmAEliminar] = useState(null);

  const traerAdministradores = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getAdministradores();
      setAdministradores(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer administradores:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarAdministrador = async () => {
    try {
      await deleteAdministrador(admAEliminar.cedula);
      setAdmAEliminar(null);
      traerAdministradores();
    } catch (error) {
      console.error(
        "Error al eliminar administrador:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerAdministradores();
  }, [traerAdministradores]);

  return (
    <>
      <div className="adm-topbar">
        <h2>Administradores</h2>
        <button
          className="adm-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar administrador
        </button>
      </div>

      <div className="adm-content">
        <div className="adm-section-card">
          <h3>
            <FaUserShield size={16} color="#5bb8f5" /> Administradores
            registrados
          </h3>

          {cargando ? (
            <p className="adm-empty">Cargando administradores...</p>
          ) : administradores.length === 0 ? (
            <p className="adm-empty">No hay administradores registrados.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {administradores.map((adm) => (
                  <tr key={adm.cedula}>
                    <td>{adm.cedula}</td>
                    <td>{adm.nombre_completo}</td>
                    <td>{adm.telefono}</td>
                    <td>{adm.email}</td>
                    <td>
                      <div className="adm-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setAdmAEditar(adm)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setAdmAEliminar(adm)}
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
        <ModalRegistrarAdministrador
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerAdministradores}
        />
      )}

      {admAEditar && (
        <ModalEditarAdministrador
          administrador={admAEditar}
          onCerrar={() => setAdmAEditar(null)}
          onEditado={() => {
            setAdmAEditar(null);
            traerAdministradores();
          }}
        />
      )}

      {admAEliminar && (
        <ModalEliminarAdministrador
          administrador={admAEliminar}
          onCerrar={() => setAdmAEliminar(null)}
          onEliminado={eliminarAdministrador}
        />
      )}
    </>
  );
};

export default Administrador;
