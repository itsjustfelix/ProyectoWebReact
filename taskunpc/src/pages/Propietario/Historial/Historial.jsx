import React, { useState, useEffect } from "react";
import { FaClipboardList, FaFilePdf } from "react-icons/fa";
import "./Historial.css";
import { getHistorialByPropietario } from "../../../services/historialService";

const Historial = () => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const traerHistorial = async () => {
      try {
        const datos = await getHistorialByPropietario(codigoUsuario);
        setConsultas(Array.isArray(datos) ? datos : []);
      } catch (error) {
        console.error("Error al traer historial:", error);
      } finally {
        setCargando(false);
      }
    };

    if (codigoUsuario) traerHistorial();
  }, [codigoUsuario]);

  return (
    <>
      <div className="historial-topbar">
        <h2>Consultas Medicas</h2>
      </div>

      <div className="historial-content">
        <div className="historial-section-card">
          <h3>
            <FaClipboardList size={16} color="#5bb8f5" /> Consultas
          </h3>

          {cargando ? (
            <p className="historial-empty">Cargando consultas...</p>
          ) : consultas.length === 0 ? (
            <p className="historial-empty">No hay consultas registradas.</p>
          ) : (
            <div className="table-responsive">
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Mascota</th>
                    <th>Veterinario</th>
                    <th>Diagnóstico</th>
                    <th>Tratamiento</th>
                    <th>PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((consulta) => (
                    <tr key={consulta.codigo}>
                      <td>{consulta.fecha}</td>
                      <td>{consulta.nombre_mascota}</td>
                      <td>{consulta.nombre_veterinario}</td>
                      <td className="td-truncate">{consulta.diagnostico}</td>
                      <td className="td-truncate">{consulta.tratamiento}</td>
                      <td>
                        <button className="btn-pdf" title="Ver reporte médico">
                          <FaFilePdf size={12} /> Ver PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Historial;
