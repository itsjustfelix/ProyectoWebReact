import React, { useState, useEffect, useCallback } from "react";
import "./Raza.css";
import { getRazas, deleteRaza } from "../../../services/razaService";
import { FaEdit, FaTrash, FaPlus, FaDog } from "react-icons/fa";
import ModalRegistrarRaza from "../../../components/Modal/ModalRegistrarRaza/ModalRegistrarRaza";
import ModalEditarRaza from "../../../components/Modal/ModalEditarRaza/ModalEditarRaza";
import ModalEliminarRaza from "../../../components/Modal/ModalEliminarRaza/ModalEliminarRaza";

const Raza = () => {
  const [razas, setRazas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [razaAEditar, setRazaAEditar] = useState(null);
  const [razaAEliminar, setRazaAEliminar] = useState(null);

  const traerRazas = useCallback(async () => {
    try {
      setCargando(true);
      const respuesta = await getRazas();
      setRazas(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer razas:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarRaza = async () => {
    try {
      await deleteRaza(razaAEliminar.codigo);
      setRazaAEliminar(null);
      traerRazas();
    } catch (error) {
      console.error(
        "Error al eliminar raza:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerRazas();
  }, [traerRazas]);

  return (
    <>
      <div className="raza-topbar">
        <h2>Razas</h2>
        <button
          className="raza-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar raza
        </button>
      </div>

      <div className="raza-content">
        <div className="raza-section-card">
          <h3>
            <FaDog size={16} color="#5bb8f5" /> Razas registradas
          </h3>

          {cargando ? (
            <p className="raza-empty">Cargando razas...</p>
          ) : razas.length === 0 ? (
            <p className="raza-empty">No hay razas registradas.</p>
          ) : (
            <table className="raza-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {razas.map((raza) => (
                  <tr key={raza.codigo}>
                    <td>{raza.codigo}</td>
                    <td>{raza.nombre}</td>
                    <td>{raza.nombre_especie}</td>
                    <td>
                      <div className="raza-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setRazaAEditar(raza)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setRazaAEliminar(raza)}
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
        <ModalRegistrarRaza
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerRazas}
        />
      )}

      {razaAEditar && (
        <ModalEditarRaza
          raza={razaAEditar}
          onCerrar={() => setRazaAEditar(null)}
          onEditado={() => {
            setRazaAEditar(null);
            traerRazas();
          }}
        />
      )}

      {razaAEliminar && (
        <ModalEliminarRaza
          raza={razaAEliminar}
          onCerrar={() => setRazaAEliminar(null)}
          onEliminado={eliminarRaza}
        />
      )}
    </>
  );
};

export default Raza;
