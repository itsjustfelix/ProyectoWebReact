import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./RegistrarMascota.css";
import { getEspecies } from "../../../../services/especieService";
import { getRazasByCodigoEspecie } from "../../../../services/razaService";
import {
  saveMascota,
  uploadImagenMascota,
} from "../../../../services/mascotasService";

const RegistrarMascota = ({ onCerrar, onGuardado }) => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [fotoMascota, setFotoMascota] = useState(null);
  const [preview, setPreview] = useState(null);
  const [especies, setEspecies] = useState([]);
  const [razasFiltradas, setRazasFiltradas] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    codigo_especie: "",
    codigo_raza: "",
  });

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoMascota(archivo);
      setPreview(URL.createObjectURL(archivo));
    }
  };

  useEffect(() => {
    const traerEspecies = async () => {
      try {
        const respuesta = await getEspecies();
        setEspecies(
          Array.isArray(respuesta) ? respuesta : respuesta.data || [],
        );
      } catch (error) {
        console.error("Error al traer especies:", error);
        setEspecies([]);
      }
    };
    traerEspecies();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "codigo_especie") {
      try {
        const respuesta = await getRazasByCodigoEspecie(value);
        const datosRazas = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];
        setRazasFiltradas(datosRazas);
        setForm((prev) => ({ ...prev, codigo_raza: "" }));
      } catch (error) {
        console.error("Error al traer razas:", error);
      }
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      let codigoImagen = null;

      if (fotoMascota) {
        codigoImagen = await uploadImagenMascota(fotoMascota);
      }

      const nuevaMascota = {
        nombre: form.nombre,
        codigo_especie: form.codigo_especie,
        codigo_raza: form.codigo_raza,
        codigo_propietario: codigoUsuario,
        codigo_imagen: codigoImagen,
      };

      await saveMascota(nuevaMascota);
      onGuardado();
      onCerrar();
    } catch (error) {
      console.error("Error al guardar mascota:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🐾 Registrar mascota</h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>
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
              id="foto-upload"
              hidden
            />
            <label htmlFor="foto-upload" className="btn-subir-foto">
              {preview ? "Cambiar foto" : "Seleccionar foto"}
            </label>
          </div>
        </div>
        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
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

          <div className="modal-acciones">
            <button
              type="button"
              className="btn-cancelar-modal"
              onClick={onCerrar}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarMascota;
