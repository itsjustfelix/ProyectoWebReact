import React, { useState, useEffect, useCallback } from "react";
import { FaClipboardList, FaEye } from "react-icons/fa";
import "./Consulta.css";
import { getConsultas } from "../../../services/consultaService";
import { formatearFecha } from "../../../utils/FormatearFecha";
import ModalVerConsulta from "../../../components/Modal/ModalVerConsulta/ModalVerConsulta";

const Consultas = () => {
  const cedulaVeterinario = localStorage.getItem("codigo_usuario");

  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [consultaAVer, setConsultaAVer] = useState(null);

  const traerConsultas = useCallback(async () => {
    try {
      setCargando(true);
      const datos = await getConsultas();
      setConsultas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error(
        "Error al traer consultas:",
        error.response?.data?.detail?.error?.message,
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (cedulaVeterinario) traerConsultas();
  }, [cedulaVeterinario, traerConsultas]);

  return (
    <>
      <div className="vet-consultas-topbar">
        <h2>Consultas</h2>
      </div>

      <div className="vet-consultas-content">
        <div className="vet-consultas-section-card">
          <h3>
            <FaClipboardList size={16} color="#5bb8f5" /> Historial de consultas
          </h3>

          {cargando ? (
            <p className="vet-consultas-empty">Cargando consultas...</p>
          ) : consultas.length === 0 ? (
            <p className="vet-consultas-empty">No hay consultas todavía.</p>
          ) : (
            <table className="vet-consultas-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Mascota</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((consulta) => (
                  <tr key={consulta.codigo}>
                    <td>{formatearFecha(consulta.fecha)}</td>
                    <td>{consulta.nombre_mascota}</td>
                    <td>
                      <button
                        className="btn-ver-detalle"
                        onClick={() => setConsultaAVer(consulta)}
                      >
                        <FaEye size={11} /> Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {consultaAVer && (
        <ModalVerConsulta
          consulta={consultaAVer}
          onCerrar={() => setConsultaAVer(null)}
        />
      )}
    </>
  );
};

export default Consultas;
