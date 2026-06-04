import api from "./api";

export const getCitasByPropietario = async (codigoUsuario) => {
  const respuesta = await api.get(`/citas/propietario/${codigoUsuario}`);
  return respuesta.data;
};

export const getCitasByVeterinario = async (cedula_veterinario) => {
  const respuesta = await api.get(`/citas/veterinario/${cedula_veterinario}`);
  return respuesta.data;
};

export const getCitasByFecha = async (fecha) => {
  const respuesta = await api.get(`/citas/fecha/${fecha}`);
  return respuesta.data;
};

export const countCitas = async (fecha) => {
  const citas = await getCitasByFecha(fecha);
  return citas.length;
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

export const getHorasOcupadas = async (fecha, cedula_veterinario) => {
  const respuesta = await api.get("/citas/ocupadas", {
    params: { fecha, cedula_veterinario },
  });
  return respuesta.data;
};
