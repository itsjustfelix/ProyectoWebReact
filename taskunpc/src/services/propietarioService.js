import api from "./api";

export const savePropietario = async (Propietario) => {
  const respuesta = await api.post("/propietarios", Propietario);
  return respuesta.data;
};

export const getPropietario = async () => {
  const respuesta = await api.get("/propietarios");
  return respuesta.data;
};

export const updatePropietario = async (propietario) => {
  const respuesta = await api.put(`/propietarios/`, propietario);
  return respuesta.data;
};

export const deletePropietario = async (cedula_propietaio) => {
  const respuesta = await api.delete(`/propietarios/${cedula_propietaio}`);
  return respuesta.data;
};

export const countPropietarios = async () => {
  const respuesta = await api.get("/propietarios");
  return respuesta.data.length;
};

export const getPropietarioPorCedula = async (cedula) => {
  const respuesta = await api.get(`/propietarios/${cedula}`);
  return respuesta.data;
};
