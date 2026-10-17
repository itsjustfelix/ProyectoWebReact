import api from "./api";

export const getRazas = async () => {
  const respuesta = await api.get("/razas");
  return respuesta.data;
};

export const getRazasByCodigoEspecie = async (codigoEspecie) => {
  const respuesta = await api.get(`/razas/especie/${codigoEspecie}`);
  return respuesta.data;
};

export const saveRaza = async (raza) => {
  const respuesta = await api.post("/razas", raza);
  return respuesta.data;
};

export const updateRaza = async (raza) => {
  const respuesta = await api.put("/razas", raza);
  return respuesta.data;
};

export const deleteRaza = async (codigo) => {
  const respuesta = await api.delete(`/razas/${codigo}`);
  return respuesta.data;
};
