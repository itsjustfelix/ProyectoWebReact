import React, { useState, useEffect } from "react";
import { FaClipboardList, FaEye, FaFilePdf } from "react-icons/fa";
import "./Historial.css";
import { getHistorialByPropietario } from "../../../services/historialService";
import { formatearFecha } from "../../../utils/FormatearFecha";
import { getConsultaPDF } from "../../../services/consultaService";
import ModalVerConsulta from "../../../components/Modal/ModalVerConsulta/ModalVerConsulta";

const Historial = () => {
  const codigoUsuario = localStorage.getItem("codigo_usuario");
  const [consultas, setConsultas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [consultaAVer, setConsultaAVer] = useState(null);

  const manejarDescargaPDF = async (codigo) => {
    try {
      const pdf = await getConsultaPDF(codigo);
      const urlDescarga = window.URL.createObjectURL(
        new Blob([pdf], { type: "application/pdf" }),
      );

      const enlace = document.createElement("a");
      enlace.href = urlDescarga;

      enlace.setAttribute("download", `consulta_${codigo}.pdf`);

      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);

      window.URL.revokeObjectURL(urlDescarga);
    } catch (error) {
      console.error("Error a descargar el pdf:", error);
    }
  };
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
                    <th>Especializacion</th>
                    <th>Veterinario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((consulta) => (
                    <tr key={consulta.codigo}>
                      <td>{formatearFecha(consulta.fecha)}</td>
                      <td>{consulta.nombre_mascota}</td>
                      <td>{consulta.nombre_especializacion}</td>
                      <td>{consulta.nombre_veterinario}</td>
                      <td>
                        <button
                          className="btn-pdf"
                          title="Ver reporte médico"
                          onClick={() => manejarDescargaPDF(consulta.codigo)}
                        >
                          <FaFilePdf size={12} /> Descargar PDF
                        </button>
                      </td>
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
            </div>
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

export default Historial;
