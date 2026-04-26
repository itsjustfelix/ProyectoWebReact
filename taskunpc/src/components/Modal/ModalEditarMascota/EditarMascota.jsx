import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../../../services/api";
import "../Modal.css";

const ModalEditarMascota = ({ mascota, onCerrar, onEditado }) => {
  const [especies, setEspecies] = useState([]);
  const [razasFiltradas, setRazasFiltradas] = useState([]);
  const [form, setForm] = useState({
    nombre: mascota.nombre || "",
    codigo_especie: mascota.codigo_especie || "",
    codigo_raza: mascota.codigo_raza || "",
  });

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const resEspecies = await api.get("/especies");
        setEspecies(resEspecies.data);

        if (mascota.codigo_especie) {
          const resRazas = await api.get(`/razas/especie/${mascota.codigo_especie}`);
          setRazasFiltradas(resRazas.data);
        }
      } catch (error) {
        console.error("Error al traer datos:", error);
      }
    };
    traerDatos();
  }, [mascota.codigo_especie]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "codigo_especie") {
      try {
        const resRazas = await api.get(`/razas/especie/${value}`);
        setRazasFiltradas(resRazas.data);
        setForm((prev) => ({ ...prev, codigo_raza: "" }));
      } catch (error) {
        console.error("Error al traer razas:", error);
      }
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/mascotas/${mascota.codigo}`, {
        nombre: form.nombre,
        codigo_especie: form.codigo_especie,
        codigo_raza: form.codigo_raza,
      });
      onEditado();
    } catch (error) {
      console.error("Error al editar mascota:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ Editar mascota</h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
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
            <button type="button" className="btn-cancelar-modal" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarMascota;