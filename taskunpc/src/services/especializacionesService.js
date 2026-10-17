import api from "./api";

export const getEspecializaciones = async () => {
  const respuesta = await api.get(`/especializaciones`);
  return respuesta.data;
};

export const saveEspecializacion = async (especializacion) => {
  const respuesta = await api.post("/especializaciones", especializacion);
  return respuesta.data;
};

export const updateEspecializacion = async (especializacion) => {
  const respuesta = await api.put("/especializaciones", especializacion);
  return respuesta.data;
};

export const deleteEspecializacion = async (codigo_especializacion) => {
  const respuesta = await api.delete(
    `/especializaciones/${codigo_especializacion}`,
  );
  return respuesta.data;
};
