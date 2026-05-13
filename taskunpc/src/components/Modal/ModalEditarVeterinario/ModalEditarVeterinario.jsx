import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "../Modal.css";
import { updateVeterinario } from "../../../services/veterinarioService";
import { getEspecializaciones } from "../../../services/especializacionesService";

const ModalEditarVeterinario = ({ veterinario, onCerrar, onEditado }) => {
  const [especializaciones, setEspecializaciones] = useState([]);
  const [form, setForm] = useState({
    cedula: veterinario.cedula,
    nombreCompleto: veterinario.nombre_completo,
    telefono: veterinario.telefono,
    sexo: veterinario.sexo,
    codigo_especialidad: veterinario.codigo_especialidad,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const traerEspecializaciones = async () => {
      try {
        const respuesta = await getEspecializaciones();
        const listaEspecializaciones = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data || [];
        setEspecializaciones(listaEspecializaciones);

        const esp = listaEspecializaciones.find(
          (e) => e.nombre === veterinario.nombre_especializacion,
        );

        if (esp) {
          setForm((prev) => ({ ...prev, codigo_especialidad: esp.codigo }));
        }
      } catch (error) {
        console.error("Error al traer especializaciones:", error);
      }
    };
    traerEspecializaciones();
  }, [veterinario.nombre_especializacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      await updateVeterinario(form);
      onEditado();
    } catch (error) {
      setError("Error al editar el veterinario:", error);
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaPencilAlt /> Editar veterinario
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group">
              <label>Cédula</label>
              <input
                type="text"
                name="cedula"
                value={form.cedula}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="modal-form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombreCompleto"
                value={form.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-form-group">
              <label>Sexo</label>
              <select
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div className="modal-form-group">
              <label>Especialización</label>
              <select
                name="codigo_especialidad"
                value={form.codigo_especialidad}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona...</option>
                {especializaciones.map((esp) => (
                  <option key={esp.codigo} value={esp.codigo}>
                    {esp.nombre}
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
            <button type="submit" className="btn-guardar">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarVeterinario;
