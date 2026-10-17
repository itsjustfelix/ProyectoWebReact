import api from "./api";

export const getVeterinarios = async () => {
  const respuesta = await api.get("/veterinarios");
  return respuesta.data;
};

export const getVeterinariosOption = async () => {
  const respuesta = await api.get("/veterinarios/option");
  return respuesta.data;
};

export const saveVeterinario = async (veterinario) => {
  const respuesta = await api.post("/veterinarios", veterinario);
  return respuesta.data;
};

export const updateVeterinario = async (veterinario) => {
  const respuesta = await api.put("/veterinarios", veterinario);
  return respuesta.data;
};

export const deleteVeterinario = async (cedula_veterinario) => {
  const respuesta = await api.delete(`/veterinarios/${cedula_veterinario}`);
  return respuesta.data;
};

export const countVeterinarios = async () => {
  const respuesta = await api.get("/veterinarios");
  return respuesta.data.length;
};
