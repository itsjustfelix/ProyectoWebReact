import api from "./api";

export const getEspecies = async () => {
  const respuesta = await api.get("/especies");
  return respuesta.data;
};

export const saveEspecie = async (especie) => {
  const respuesta = await api.post("/especies", especie);
  return respuesta.data;
};

export const updateEspecie = async (codigo, nombre) => {
  const respuesta = await api.put("/especies", { codigo, nombre });
  return respuesta.data;
};

export const deleteEspecie = async (codigo_especie) => {
  const respuesta = await api.delete(`/especies/${codigo_especie}`);
  return respuesta.data;
};
