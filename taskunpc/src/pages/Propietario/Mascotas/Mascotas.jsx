import React, { useState, useEffect, useCallback } from "react";
import { FaPaw, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import {
  deleteMascota,
  getMascotasByPropietario,
} from "../../../services/mascotasService";
import RegistrarMascota from "./RegistrarMascota/RegistrarMascota";
import "./Mascotas.css";
import ModalEditarMascota from "../../../components/Modal/ModalEditarMascota/EditarMascota";
import ModalEliminarMascota from "../../../components/Modal/ModalEliminarMascota/EliminarMascota";

const Mascotas = () => {
  /**
   * codigousuario obtiene el codigo del usuario desde el localstore
   * para buscar las mascotas que son de la persona que inicio sesion
   */
  const codigoUsuario = localStorage.getItem("codigo_usuario");

  /**
   * -la conts mascota lo quye guarda es la lista de mascotas de usuario
   * que inicio sesion que devuelve el backend.
   *
   * - la const cargando loq ue hace es controlar los mensaje de cargando mascotas
   * mientra llega la lista del backend para ser renderizada.
   *
   * - la const modalabierto lo que hace es controlar si se esta msotrando el modal
   * de registrar mascotas
   *
   * - la const mascotaeditar lo que hace es guardar la mascota que se va a editar,
   * cuando no esta en null significa se va a editar una mascota y se renderiza el
   * modal de editar, de lo contrario permanece en null y no renderiza nada
   *
   * - la const mascotaeliminar lo que hace es guarda la amscota que se va a eliminar,
   * si no esta null es porque se va a eliminar una mascota y se renderiza el modal
   * que pregunta si se va a elimnar la mascota, de lo contrario esta en null y no renderiza nada.
   *
   */
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mascotaAEditar, setMascotaAEditar] = useState(null);
  const [mascotaAEliminar, setMascotaAEliminar] = useState(null);

  /**
   * usecallback lo que hace es memorizar la funcion traer mascotas para que react
   * renderice la apgina mascota, el useefect que utiliza esat funcion no entre en un loop.
   *
   * esta funcion es la que se encarga de traer las mascotas del backend, se eserciora
   * que lo que viene si sea un array y no sea otra cosa para que el map funcione bien
   * y lo mete en set mascota que es la que se utiliza para renderizar las mascotas.
   * el setcargando lo que ahce es ponerle un mensajito al usuario para que  sepa que
   * se estan caragando las mascotas y no vea una pantalla en blanco
   */

  const traerMascotas = useCallback(async () => {
    try {
      setCargando(true);
      const datos = await getMascotasByPropietario(codigoUsuario);
      setMascotas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error("Error al traer mascotas:", error);
    } finally {
      setCargando(false);
    }
  }, [codigoUsuario]);

  /**
   * cuando le da click al boton de eliminar mascota es a esta funcion
   * que se llama para que guarde la mascota y gracias a esat es que se
   * renderiza el modal de eliminar
   */

  const confirmarEliminar = (mascota) => {
    setMascotaAEliminar(mascota);
  };

  /**
   * esta es la funcion que elimina la mascota de la base de datos.
   * llama al servicio que se encarga de eliminar, le pasa el codigo y
   * carga nuevamente las mascotas.
   */
  const eliminarMascota = async () => {
    try {
      await deleteMascota(mascotaAEliminar.codigo);
      setMascotaAEliminar(null);
      traerMascotas();
    } catch (error) {
      console.error("Error al eliminar mascota:", error);
    }
  };

  /**
   * esat funcion es la que se encarga de guardar la mascota cuando le da click
   * al boton de editar y ademas es la encargada de renderizar el modal de editar
   * dependeiendo de si esta en null o no.
   */
  const editarMascota = (mascota) => {
    setMascotaAEditar(mascota);
  };

  /**
   * este useefct se ejecuta cuando la pagina se renderiza y cada vez
   * traer mascota se llame o el codigoUsuario cambie, esta verifica
   * que el codigousuario exista antes de llamar a traer mascotas
   * para evitar que se hagan llamadas inecesarias
   */
  useEffect(() => {
    if (codigoUsuario) traerMascotas();
  }, [codigoUsuario, traerMascotas]);

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
              <div className="mascota-card" key={mascota.codigo}>
                <div className="mascota-avatar">
                  {mascota.link_imagen ? (
                    <img src={mascota.link_imagen} alt={mascota.nombre} />
                  ) : (
                    <FaPaw size={32} />
                  )}
                </div>
                <div className="mascota-nombre">{mascota.nombre}</div>
                <div className="mascota-info">
                  {mascota.nombre_especie} — {mascota.nombre_raza}
                </div>
                <div className="mascota-acciones">
                  <button
                    className="btn-editar"
                    onClick={() => editarMascota(mascota)}
                  >
                    <FaEdit size={12} /> Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => confirmarEliminar(mascota)}
                  >
                    <FaTrash size={12} /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/**
       * este es el modal que se llama cuando se clickea el boton de
       * registrar mascotas
       */}
      {modalAbierto && (
        <RegistrarMascota
          onCerrar={() => setModalAbierto(false)}
          onGuardado={traerMascotas}
        />
      )}
      {/**
       * modal que se llama cuando se clikea al boton editar de una
       * mascota
       */}
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
      {/**
       * modal que se llama al momento de clickear el boton de elimnar
       * mascota
       */}
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

export default Mascotas;
