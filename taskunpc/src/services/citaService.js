import api from "./api";

export const getCitasByPropietario = async (codigoUsuario) => {
  const respuesta = await api.get(`/citas/propietario/${codigoUsuario}`);
  return respuesta.data;
};
