import api from "./api";

export const getConsultas = async () => {
  const respuesta = await api.get("/consultas");
  return respuesta.data;
};

export const getConsultaByVeterinario = async (codigo_veterinario) => {
  const respuesta = await api.get(
    `/consultas/veterinario/${codigo_veterinario}`,
  );
  return respuesta.data;
};

export const getConsultaByCodigoMascota = async (codigo_mascota) => {
  const respuesta = await api.get(`/consultas/mascota/${codigo_mascota}`);
  return respuesta.data;
};

export const getConsultaByCodigoPropietario = async (codigo_propietario) => {
  const respuesta = await api.get(
    `/consultas/propietario/${codigo_propietario}`,
  );
  return respuesta.data;
};

export const saveConsulta = async (consulta) => {
  const respuesta = await api.post("/consultas", consulta);
  return respuesta.data;
};

export const updateConsulta = async (consulta) => {
  const respuesta = await api.put("/consultas", consulta);
  return respuesta.data;
};

export const deleteConsulta = async (codigo_consulta) => {
  const respuesta = await api.delete(`/consultas/${codigo_consulta}`);
  return respuesta.data;
};

export const countConsultasVeterinario = async (codigo_veterinario) => {
  const respuesta = await getConsultaByVeterinario(codigo_veterinario);
  const fechaISO = new Date().toISOString().split("T")[0];
  const hoy = Array.isArray(respuesta)
    ? respuesta.filter((c) => c.fecha === fechaISO)
    : [];
  return hoy.length;
};

export const getConsultaPDF = async (codigo) => {
  const respuesta = await api.get(`/consultas/pdf/${codigo}`, {
    responseType: "blob",
  });
  return respuesta.data;
};
