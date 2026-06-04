import React, { useState, useEffect } from "react";
import { FaPaw, FaTimes, FaSearch, FaCheckCircle } from "react-icons/fa";
import "../Modal.css";
import { getPropietarioPorCedula } from "../../../services/propietarioService";
import { getEspecies } from "../../../services/especieService";
import { getRazasByCodigoEspecie } from "../../../services/razaService";
import {
  saveMascota,
  uploadImagenMascota,
} from "../../../services/mascotasService";

const ModalRegistrarMascota = ({ onCerrar, onGuardado }) => {
  const [paso, setPaso] = useState(1);
  const [cedula, setCedula] = useState("");
  const [propietario, setPropietario] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  const [especies, setEspecies] = useState([]);
  const [razasFiltradas, setRazasFiltradas] = useState([]);
  const [fotoMascota, setFotoMascota] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    codigo_especie: "",
    codigo_raza: "",
  });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (paso === 2) {
      const traerEspecies = async () => {
        try {
          const respuesta = await getEspecies();
          setEspecies(Array.isArray(respuesta) ? respuesta : []);
        } catch (error) {
          console.error(
            "Error al traer especies:",
            error.response?.data?.detail?.error?.message,
          );
        }
      };
      traerEspecies();
    }
  }, [paso]);

  const handleBuscarPropietario = async (e) => {
    e.preventDefault();
    if (!cedula.trim()) return;
    setBuscando(true);
    setErrorBusqueda("");
    try {
      const datos = await getPropietarioPorCedula(cedula.trim());
      setPropietario({
        cedula: cedula.trim(),
        nombre: datos.nombre,
        codigo_usuario: datos.codigo_usuario,
      });
      setPaso(2);
    } catch (error) {
      const codigo = error.response?.data?.detail?.error?.code;
      if (codigo === "NOT_FOUND") {
        setErrorBusqueda("No se encontró un propietario con esa cédula.");
      } else {
        setErrorBusqueda("Error al buscar el propietario. Intenta de nuevo.");
      }
    } finally {
      setBuscando(false);
    }
  };

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoMascota(archivo);
      setPreview(URL.createObjectURL(archivo));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");

    if (name === "codigo_especie") {
      try {
        if (!value) {
          setRazasFiltradas([]);
          setForm((prev) => ({ ...prev, codigo_raza: "" }));
          return;
        }
        const respuesta = await getRazasByCodigoEspecie(value);
        setRazasFiltradas(Array.isArray(respuesta) ? respuesta : []);
        setForm((prev) => ({ ...prev, codigo_raza: "" }));
      } catch (error) {
        console.error(
          "Error al traer razas:",
          error.response?.data?.detail?.error?.message,
        );
      }
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (guardando) return;
    setGuardando(true);
    try {
      let linkImagen = null;
      if (fotoMascota) {
        linkImagen = await uploadImagenMascota(fotoMascota);
      }

      await saveMascota({
        nombre: form.nombre,
        codigo_especie: form.codigo_especie,
        codigo_raza: form.codigo_raza,
        codigo_propietario: propietario.codigo_usuario,
        link_imagen: linkImagen,
      });

      onGuardado();
      onCerrar();
    } catch (error) {
      setError(
        "Error al registrar la mascota: " +
          error.response?.data?.detail?.error?.message,
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPaw /> Registrar mascota
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        {/* paso 1: buscar propietario por cedula */}
        {paso === 1 && (
          <form onSubmit={handleBuscarPropietario}>
            <div className="modal-grid">
              <div className="modal-form-group modal-full">
                <label>Cédula del propietario</label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => {
                    setCedula(e.target.value);
                    setErrorBusqueda("");
                  }}
                  placeholder="Ej: 1234567890"
                  required
                />
              </div>
            </div>

            {errorBusqueda && <p className="msg-error">{errorBusqueda}</p>}

            <div className="modal-acciones">
              <button
                type="button"
                className="btn-cancelar-modal"
                onClick={onCerrar}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-guardar" disabled={buscando}>
                <FaSearch size={12} />{" "}
                {buscando ? "Buscando..." : "Buscar propietario"}
              </button>
            </div>
          </form>
        )}

        {/* paso 2: llenar datos de la mascota */}
        {paso === 2 && (
          <form onSubmit={handleGuardar}>
            {/* chip que muestra el propietario encontrado */}
            <div className="mascota-admin-propietario-chip">
              <FaCheckCircle color="#1e8449" size={14} />
              <span>
                Propietario: <strong>{propietario.nombre}</strong>
              </span>
              <button
                type="button"
                className="mascota-admin-chip-cambiar"
                onClick={() => {
                  setPaso(1);
                  setPropietario(null);
                  setForm({ nombre: "", codigo_especie: "", codigo_raza: "" });
                  setRazasFiltradas([]);
                  setPreview(null);
                  setFotoMascota(null);
                }}
              >
                Cambiar
              </button>
            </div>

            <div className="modal-grid">
              {/* foto de la mascota */}
              <div className="modal-form-group modal-full">
                <label>Foto de la mascota</label>
                <div className="foto-preview-container">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Previsualización"
                      className="foto-preview"
                    />
                  ) : (
                    <div className="foto-placeholder">Sin foto</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    id="foto-upload-admin"
                    hidden
                  />
                  <label htmlFor="foto-upload-admin" className="btn-subir-foto">
                    {preview ? "Cambiar foto" : "Seleccionar foto"}
                  </label>
                </div>
              </div>

              <div className="modal-form-group modal-full">
                <label>Nombre de la mascota</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Firulais"
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Especie</label>
                <select
                  name="codigo_especie"
                  value={form.codigo_especie}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona...</option>
                  {especies.map((esp) => (
                    <option key={esp.codigo} value={esp.codigo}>
                      {esp.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-form-group">
                <label>Raza</label>
                <select
                  name="codigo_raza"
                  value={form.codigo_raza}
                  onChange={handleChange}
                  required
                  disabled={!form.codigo_especie}
                >
                  <option value="">Selecciona...</option>
                  {razasFiltradas.map((raza) => (
                    <option key={raza.codigo} value={raza.codigo}>
                      {raza.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="msg-error">{error}</p>}

            <div className="modal-acciones">
              <button
                type="button"
                className="btn-cancelar-modal"
                onClick={onCerrar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-guardar"
                disabled={guardando}
              >
                {guardando ? "Guardando..." : "Guardar mascota"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalRegistrarMascota;
