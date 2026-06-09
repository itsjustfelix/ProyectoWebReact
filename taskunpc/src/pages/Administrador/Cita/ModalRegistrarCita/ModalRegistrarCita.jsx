import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaCalendarAlt,
  FaSearch,
  FaCheckCircle,
  FaPaw,
} from "react-icons/fa";
import "../../../../components/Modal/Modal.css";
import "./ModalRegistrarCita.css";
import { getPropietarioPorCedula } from "../../../../services/propietarioService";
import { getMascotasByPropietario } from "../../../../services/mascotasService";
import { getEspecializaciones } from "../../../../services/especializacionesService";
import { getVeterinariosOption } from "../../../../services/veterinarioService";
import { saveCita, getHorasOcupadas } from "../../../../services/citaService";
import {
  generarHorasDisponibles,
  formatearHoraSelect,
} from "../../../../utils/GenerarHoras";

const ModalRegistrarCitaAdmin = ({ onCerrar, onGuardado }) => {
  const [paso, setPaso] = useState(1);

  const [cedula, setCedula] = useState("");
  const [propietario, setPropietario] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  const [mascotas, setMascotas] = useState([]);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [cargandoMascotas, setCargandoMascotas] = useState(false);

  const [especializaciones, setEspecializaciones] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [vetFiltrados, setVetFiltrados] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const horasDisponibles = generarHorasDisponibles();
  const [form, setForm] = useState({
    codigoEspecializacion: "",
    cedulaVeterinario: "",
    fecha: "",
    hora: "",
  });

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

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

      setCargandoMascotas(true);
      const listaMascotas = await getMascotasByPropietario(
        datos.codigo_usuario,
      );
      setMascotas(Array.isArray(listaMascotas) ? listaMascotas : []);
      setCargandoMascotas(false);

      setPaso(2);
    } catch (err) {
      const codigo = err.response?.data?.detail?.error?.code;
      setErrorBusqueda(
        codigo === "NOT_FOUND"
          ? "No se encontró un propietario con esa cédula."
          : "Error al buscar el propietario. Intenta de nuevo.",
      );
    } finally {
      setBuscando(false);
    }
  };

  const handleElegirMascota = (mascota) => {
    setMascotaSeleccionada(mascota);
    setPaso(3);
  };

  useEffect(() => {
    if (paso !== 3) return;
    const cargar = async () => {
      try {
        const [resEsp, resVets] = await Promise.all([
          getEspecializaciones(),
          getVeterinariosOption(),
        ]);
        setEspecializaciones(Array.isArray(resEsp) ? resEsp : []);
        setVeterinarios(Array.isArray(resVets) ? resVets : []);
      } catch (err) {
        console.error(
          "Error al cargar datos del paso 3:",
          err.response?.data?.detail?.error?.message,
        );
      }
    };
    cargar();
  }, [paso]);

  const consultarDisponibilidad = async (cedulaVet, fecha) => {
    if (!cedulaVet || !fecha) return;
    try {
      const ocupadas = await getHorasOcupadas(fecha, cedulaVet);
      setHorasOcupadas(ocupadas);
      setForm((prev) => ({ ...prev, hora: "" }));
    } catch (err) {
      console.error(
        "Error al consultar disponibilidad:",
        err.response?.data?.detail?.error?.message,
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");

    if (name === "codigoEspecializacion") {
      const filtrados = veterinarios.filter(
        (v) => v.codigo_especializacion === value,
      );
      setVetFiltrados(filtrados);
      setForm((prev) => ({ ...prev, cedulaVeterinario: "", hora: "" }));
      setHorasOcupadas([]);
    }

    if (name === "cedulaVeterinario") {
      consultarDisponibilidad(value, form.fecha);
    }

    if (name === "fecha") {
      consultarDisponibilidad(form.cedulaVeterinario, value);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (guardando) return;
    setGuardando(true);
    try {
      await saveCita({
        fecha: form.fecha,
        hora: form.hora,
        codigoMascota: mascotaSeleccionada.codigo,
        codigoEspecializacion: form.codigoEspecializacion,
        cedulaVeterinario: form.cedulaVeterinario,
      });
      onGuardado();
      onCerrar();
    } catch (err) {
      setError(
        "Error al registrar la cita: " +
          (err.response?.data?.detail?.error?.message || "Intenta de nuevo."),
      );
    } finally {
      setGuardando(false);
    }
  };

  const reiniciar = () => {
    setPaso(1);
    setCedula("");
    setPropietario(null);
    setMascotas([]);
    setMascotaSeleccionada(null);
    setForm({
      codigoEspecializacion: "",
      cedulaVeterinario: "",
      fecha: "",
      hora: "",
    });
    setHorasOcupadas([]);
    setError("");
    setErrorBusqueda("");
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <FaCalendarAlt size={15} /> Registrar cita
          </h3>
          <button className="modal-cerrar" onClick={onCerrar}>
            <FaTimes />
          </button>
        </div>

        {paso === 1 && (
          <form onSubmit={handleBuscarPropietario}>
            <p className="cita-adm-paso-label">
              Paso 1 — Identificar propietario
            </p>
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

        {paso === 2 && (
          <div>
            <p className="cita-adm-paso-label">Paso 2 — Seleccionar mascota</p>

            {/* chip del propietario encontrado */}
            <div className="cita-adm-propietario-chip">
              <FaCheckCircle color="#1e8449" size={14} />
              <span>
                Propietario: <strong>{propietario.nombre}</strong>
              </span>
              <button className="cita-adm-chip-cambiar" onClick={reiniciar}>
                Cambiar
              </button>
            </div>

            {cargandoMascotas ? (
              <p className="modal-texto">Cargando mascotas...</p>
            ) : mascotas.length === 0 ? (
              <p className="modal-texto">
                Este propietario no tiene mascotas registradas.
              </p>
            ) : (
              <div className="cita-adm-mascotas-lista">
                {mascotas.map((m) => (
                  <div
                    key={m.codigo}
                    className="cita-adm-mascota-item"
                    onClick={() => handleElegirMascota(m)}
                  >
                    <div className="cita-adm-mascota-avatar">
                      {m.link_imagen ? (
                        <img src={m.link_imagen} alt={m.nombre} />
                      ) : (
                        <FaPaw size={16} color="#2e9cdb" />
                      )}
                    </div>
                    <div>
                      <div className="cita-adm-mascota-nombre">{m.nombre}</div>
                      <div className="cita-adm-mascota-sub">
                        {m.nombre_especie} — {m.nombre_raza}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-acciones">
              <button className="btn-cancelar-modal" onClick={onCerrar}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {paso === 3 && (
          <form onSubmit={handleGuardar}>
            <p className="cita-adm-paso-label">Paso 3 — Datos de la cita</p>

            {/* chip propietario */}
            <div className="cita-adm-propietario-chip">
              <FaCheckCircle color="#1e8449" size={14} />
              <span>
                Propietario: <strong>{propietario.nombre}</strong>
              </span>
              <button
                type="button"
                className="cita-adm-chip-cambiar"
                onClick={reiniciar}
              >
                Cambiar
              </button>
            </div>

            <div className="cita-adm-mascota-chip">
              <FaPaw size={14} color="#2e9cdb" />
              <span>
                Mascota: <strong>{mascotaSeleccionada.nombre}</strong>{" "}
                <span style={{ color: "#4a6278", fontWeight: 400 }}>
                  ({mascotaSeleccionada.nombre_especie})
                </span>
              </span>
              <button
                type="button"
                className="cita-adm-mascota-chip-cambiar"
                onClick={() => {
                  setMascotaSeleccionada(null);
                  setForm({
                    codigoEspecializacion: "",
                    cedulaVeterinario: "",
                    fecha: "",
                    hora: "",
                  });
                  setPaso(2);
                }}
              >
                Cambiar
              </button>
            </div>

            <div className="modal-grid">
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
                  name="cedulaVeterinario"
                  value={form.cedulaVeterinario}
                  onChange={handleChange}
                  required
                  disabled={!form.codigoEspecializacion}
                >
                  <option value="">Selecciona un veterinario...</option>
                  {vetFiltrados.map((v) => (
                    <option key={v.cedula} value={v.cedula}>
                      {v.nombre_completo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  disabled={!form.cedulaVeterinario}
                />
              </div>

              <div className="modal-form-group">
                <label>Hora</label>
                <select
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  disabled={!form.cedulaVeterinario || !form.fecha}
                >
                  <option value="">Selecciona una hora...</option>
                  {horasDisponibles
                    .filter((h) => !horasOcupadas.includes(h))
                    .map((h) => (
                      <option key={h} value={h}>
                        {formatearHoraSelect(h)}
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
                {guardando ? "Guardando..." : "Guardar cita"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalRegistrarCitaAdmin;
