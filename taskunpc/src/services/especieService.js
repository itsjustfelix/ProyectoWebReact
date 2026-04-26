import api from "./api";

export const getEspecies = async () => {
  const respuesta = await api.get("/especies");
  return respuesta.data;
};
