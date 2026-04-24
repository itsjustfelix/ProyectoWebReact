import api from "./api";

export const getHistorialByPropietario = async (codigoUsuario) => {
  const respuesta = await api.get(`/consultas/propietario/${codigoUsuario}`);
  return respuesta.data;
};
