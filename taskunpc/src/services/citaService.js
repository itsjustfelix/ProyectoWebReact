import api from "./api";

export const getCitasByPropietario = async (codigoUsuario) => {
  const respuesta = await api.get(`/citas/propietario/${codigoUsuario}`);
  return respuesta.data;
};

export const saveCita = async (cita) => {
  const respuesta = await api.post("/citas", cita);
  return respuesta.data;
};

export const updateCita = async (cita) => {
  const respuesta = await api.put("/citas", cita);
  return respuesta.data;
};

export const deleteCita = async (codigo_cita) => {
  const respuesta = await api.delete(`/citas/${codigo_cita}`);
  return respuesta.data;
};
