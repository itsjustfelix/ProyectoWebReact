import React, { useState, useEffect, useCallback } from "react";
import "./Especializacion.css";
import {
  getEspecializaciones,
  deleteEspecializacion,
} from "../../../services/especializacionesService";
import { FaEdit, FaTrash, FaPlus, FaStar } from "react-icons/fa";
import ModalRegistrarEspecializacion from "../../../components/Modal/ModalRegistrarEspecializacion/ModalRegistrarEspecializacion";
import ModalEditarEspecializacion from "../../../components/Modal/ModalEditarEspecializacion/ModalEditarEspecializacion";
import ModalEliminarEspecializacion from "../../../components/Modal/ModalEliminarEspecializacion/ModalEliminarEspecializacion";

const Especializacion = () => {
  const [especializaciones, setEspecializaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [espAEditar, setEspAEditar] = useState(null);
  const [espAEliminar, setEspAEliminar] = useState(null);

  const traerEspecializaciones = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getEspecializaciones();
      setEspecializaciones(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer especializaciones:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarEspecializacion = async () => {
    try {
      await deleteEspecializacion(espAEliminar.codigo);
      setEspAEliminar(null);
      traerEspecializaciones();
    } catch (error) {
      console.error(
        "Error al eliminar especialización:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerEspecializaciones();
  }, [traerEspecializaciones]);

  return (
    <>
      <div className="espec-topbar">
        <h2>Especializaciones</h2>
        <button
          className="espec-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar especialización
        </button>
      </div>

      <div className="espec-content">
        <div className="espec-section-card">
          <h3>
            <FaStar size={16} color="#5bb8f5" /> Especializaciones registradas
          </h3>

          {cargando ? (
            <p className="espec-empty">Cargando especializaciones...</p>
          ) : especializaciones.length === 0 ? (
            <p className="espec-empty">No hay especializaciones registradas.</p>
          ) : (
            <table className="espec-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {especializaciones.map((esp) => (
                  <tr key={esp.codigo}>
                    <td>{esp.codigo}</td>
                    <td>{esp.nombre}</td>
                    <td>
                      <div className="espec-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setEspAEditar(esp)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setEspAEliminar(esp)}
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
        <ModalRegistrarEspecializacion
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerEspecializaciones}
        />
      )}

      {espAEditar && (
        <ModalEditarEspecializacion
          especializacion={espAEditar}
          onCerrar={() => setEspAEditar(null)}
          onEditado={() => {
            setEspAEditar(null);
            traerEspecializaciones();
          }}
        />
      )}

      {espAEliminar && (
        <ModalEliminarEspecializacion
          especializacion={espAEliminar}
          onCerrar={() => setEspAEliminar(null)}
          onEliminado={eliminarEspecializacion}
        />
      )}
    </>
  );
};

export default Especializacion;
