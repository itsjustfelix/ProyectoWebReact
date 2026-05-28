import React, { useState, useEffect, useCallback } from "react";
import "./Especie.css";
import { getEspecies, deleteEspecie } from "../../../services/especieService";
import { FaEdit, FaTrash, FaPlus, FaPaw } from "react-icons/fa";
import ModalRegistrarEspecie from "../../../components/Modal/ModalRegistrarEspecie/RegistrarEspecie";
import ModalEditarEspecie from "../../../components/Modal/ModalEditarEspecie/ModalEditarEspecie";
import ModalEliminarEspecie from "../../../components/Modal/ModalEliminarEspecie/ModalEliminarEspecie";

const Especie = () => {
  const [Especies, setEspecies] = useState([]);
  const [cargando, setcargando] = useState(true);
  const [modalRegistrar, setModalRegistrar] = useState(false);
  const [espAEditar, setEspAEditar] = useState(null);
  const [espEliminar, setEspEliminar] = useState(null);

  const traerEspecies = useCallback(async () => {
    try {
      setcargando(true);
      const respuesta = await getEspecies();
      setEspecies(Array.isArray(respuesta) ? respuesta : []);
    } catch (error) {
      console.error(
        "Error al traer especies:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setcargando(false);
    }
  }, []);

  const eliminarEspecie = async () => {
    try {
      await deleteEspecie(espEliminar.codigo);
      setEspEliminar(null);
      traerEspecies();
    } catch (error) {
      console.error(
        "Error al eliminar especie:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  useEffect(() => {
    traerEspecies();
  }, [traerEspecies]);

  return (
    <>
      <div className="esp-topbar">
        <h2>Especies</h2>
        <button
          className="esp-btn-agregar"
          onClick={() => setModalRegistrar(true)}
        >
          <FaPlus size={14} /> Agregar Especie
        </button>
      </div>

      <div className="esp-content">
        <div className="esp-section-card">
          <h3>
            <FaPaw size={16} color="#5bb8f5" /> Especies registradas
          </h3>

          {cargando ? (
            <p className="esp-empty">Cargando especies...</p>
          ) : Especies.length === 0 ? (
            <p className="esp-empty">No hay especies registradas.</p>
          ) : (
            <table className="esp-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Especies.map((esp) => (
                  <tr key={esp.codigo}>
                    <td>{esp.codigo}</td>
                    <td>{esp.nombre}</td>
                    <td>
                      <div className="esp-acciones">
                        <button
                          className="btn-editar"
                          onClick={() => setEspAEditar(esp)}
                        >
                          <FaEdit size={12} /> Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setEspEliminar(esp)}
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
        <ModalRegistrarEspecie
          onCerrar={() => setModalRegistrar(false)}
          onGuardado={traerEspecies}
        />
      )}

      {espAEditar && (
        <ModalEditarEspecie
          especie={espAEditar}
          onCerrar={() => setEspAEditar(null)}
          onEditado={() => {
            setEspAEditar(null);
            traerEspecies();
          }}
        />
      )}

      {espEliminar && (
        <ModalEliminarEspecie
          especie={espEliminar}
          onCerrar={() => setEspEliminar(null)}
          onEliminado={eliminarEspecie}
        />
      )}
    </>
  );
};

export default Especie;
