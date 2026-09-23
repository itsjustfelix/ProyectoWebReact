import React, { useState, useEffect } from "react";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import "../../../../components/Modal/modal.css";
import { getMascotasByPropietario } from "../../../../services/mascotasService";
import { getEspecializaciones } from "../../../../services/especializacionesService";
import { getVeterinariosOption } from "../../../../services/veterinarioService";
import { saveCita } from "../../../../services/citaService";
import { getHorasOcupadas } from "../../../../services/citaService";
import { generarHorasDisponibles } from "../../../../utils/GenerarHoras";
import { formatearHoraSelect } from "../../../../utils/GenerarHoras";

const RegistrarCita = ({ onCerrar, onGuardado }) => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [mascotas, setMascotas] = useState([]);
  const [especializaciones, setEspecializaciones] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [vetFiltrados, setVetFiltrados] = useState([]);
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    codigoMascota: "",
    codigoEspecializacion: "",
    codigoVeterinario: "",
  });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const horasDisponibles = generarHorasDisponibles();
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const [resMascotas, resEsp, resVets] = await Promise.all([
          getMascotasByPropietario(codigoUsuario),
          getEspecializaciones(),
          getVeterinariosOption(),
        ]);
        setMascotas(Array.isArray(resMascotas) ? resMascotas : []);
        setEspecializaciones(Array.isArray(resEsp) ? resEsp : []);
        setVeterinarios(Array.isArray(resVets) ? resVets : []);
      } catch (error) {
        console.error(
          "Error al traer datos:",
          error.response?.data?.detail?.error?.message,
        );
      }
    };
    traerDatos();
  }, [codigoUsuario]);

  const consultarDisponibilidad = async (codigoVeterinario, fecha) => {
    if (!codigoVeterinario || !fecha) return;
    try {
      const horasOcupadas = await getHorasOcupadas(fecha, codigoVeterinario);
      setHorasOcupadas(horasOcupadas);
      setForm((prev) => ({ ...prev, hora: "" }));
    } catch (error) {
      console.error(
        "Error al consultar disponibilidad:",
        error.response?.data?.detail?.error?.message,
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");

    if (name === "codigoEspecializacion") {
      const vetFiltrados = veterinarios.filter(
        (v) => v.codigo_especializacion === value,
      );
      setVetFiltrados(vetFiltrados);
      setForm((prev) => ({ ...prev, codigoVeterinario: "", hora: "" }));
      setHorasOcupadas([]);
    }

    if (name === "codigoVeterinario") {
      consultarDisponibilidad(value, form.fecha);
    }
    if (name === "fecha") {
      consultarDisponibilidad(form.codigoVeterinario, value);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (guardando) return;
    setGuardando(true);

    try {
      await saveCita(form);
      onGuardado();
      onCerrar();
    } catch (error) {
      setError(
        "Error al agendar la cita:",
        error.response?.data?.detail?.error?.message,
      );
      console.error(
        "Error al agendar la cita:",
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
            <FaCalendarAlt /> Agendar cita
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleGuardar}>
          <div className="modal-grid">
            <div className="modal-form-group modal-full">
              <label>Mascota</label>
              <select
                name="codigoMascota"
                value={form.codigoMascota}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona tu mascota...</option>
                {mascotas.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.nombre} — {m.nombre_especie}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-form-group modal-full">
              <label>Especialización</label>
              <select
                name="codigoEspecializacion"
                value={form.codigoEspecializacion}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una especialización...</option>
                {especializaciones.map((esp) => (
                  <option key={esp.codigo} value={esp.codigo}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-form-group modal-full">
              <label>Veterinario</label>
              <select
                name="codigoVeterinario"
                value={form.codigoVeterinario}
                onChange={handleChange}
                required
                disabled={!form.codigoEspecializacion}
              >
                <option value="">Selecciona un veterinario...</option>
                {vetFiltrados.map((v) => (
                  <option key={v.codigo_usuario} value={v.codigo_usuario}>
                    {v.nombre_completo}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-form-group modal-full">
              <label>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                disabled={!form.codigoVeterinario}
              />
            </div>

            <div className="modal-form-group modal-full">
              <label>Hora</label>
              <select
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
                disabled={!form.codigoVeterinario || !form.fecha}
              >
                <option value="">Selecciona una hora...</option>
                {horasDisponibles
                  .filter((hora) => !horasOcupadas.includes(hora))
                  .map((hora) => (
                    <option key={hora} value={hora}>
                      {formatearHoraSelect(hora)}
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
            <button type="submit" className="btn-guardar" disabled={guardando}>
              {guardando ? "Agendando..." : "Agendar cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarCita;
