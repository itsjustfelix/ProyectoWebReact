import React, { useState, useEffect, useCallback } from "react";
import "./Propietario.css";
import {
  getPropietario,
  deletePropietario,
} from "../../../services/propietarioService";
import { FaUsers, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModalRegistrarPropietario from "../../../components/Modal/ModalRegistrarPropietario/ModalRegistrarPropietario";
import ModalEditarPropietario from "../../../components/Modal/ModalEditarPropietario/ModalEditarPropietario";
import ModalEliminarPropietario from "../../../components/Modal/ModalEliminarPropietario/ModalEliminarPropietario";

const Propietarios = () => {
  const [propietarios, setPropietarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [propAEditar, setPopAEditar] = useState(null);
  const [propAEliminar, setPropAEliminar] = useState(null);

  const traerPropietarios = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getPropietario();
      setPropietarios(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer propietarios:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarPropietario = async () => {
    try {
      await deletePropietario(propAEliminar.cedula);
      setPropAEliminar(null);
      traerPropietarios();
    } catch (error) {
      console.error(
        "Error al eliminar propietario:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerPropietarios();
  }, [traerPropietarios]);

  return (
    <>
      <div className="prop-topbar">
        <h2>Propietarios</h2>
        <button
          className="prop-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar properinario
        </button>
      </div>

      <div className="prop-content">
        <div className="prop-section-card">
          <h3>
            <FaUsers size={16} color="#5bb8f5" /> Propietarios registrados
          </h3>

          {cargando ? (
            <p className="prop-empty">Cargando propietarios...</p>
          ) : propietarios.length === 0 ? (
            <p className="prop-empty">No hay propietarios registrados.</p>
          ) : (
            <table className="prop-table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {propietarios.map((prop) => (
                  <tr key={prop.cedula}>
                    <td>{prop.cedula}</td>
                    <td>{prop.nombre_completo}</td>
                    <td>{prop.telefono}</td>
                    <td>
                      <div className="prop-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setPopAEditar(prop)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setPropAEliminar(prop)}
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
        <ModalRegistrarPropietario
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerPropietarios}
        />
      )}

      {propAEditar && (
        <ModalEditarPropietario
          propietario={propAEditar}
          onCerrar={() => setPopAEditar(null)}
          onEditado={() => {
            setPopAEditar(null);
            traerPropietarios();
          }}
        />
      )}

      {propAEliminar && (
        <ModalEliminarPropietario
          propietario={propAEliminar}
          onCerrar={() => setPropAEliminar(null)}
          onEliminado={eliminarPropietario}
        />
      )}
    </>
  );
};

export default Propietarios;
