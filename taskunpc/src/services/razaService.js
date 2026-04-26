import api from "./api";

export const getRazasByCodigoEspecie = async (codigoEspecie) => {
  const respuesta = await api.get(`/razas/especie/${codigoEspecie}`);
  return respuesta.data;
};
