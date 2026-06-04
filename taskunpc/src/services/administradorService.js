import api from "./api";

export const getAdministradores = async () => {
  const respuesta = await api.get("/administradores");
  return respuesta.data;
};

export const saveAdministrador = async (administrador) => {
  const respuesta = await api.post("/administradores", administrador);
  return respuesta.data;
};

export const updateAdministrador = async (administrador) => {
  const respuesta = await api.put(
    `/administradores/${administrador.cedula}`,
    administrador,
  );
  return respuesta.data;
};

export const deleteAdministrador = async (cedula) => {
  const respuesta = await api.delete(`/administradores/${cedula}`);
  return respuesta.data;
};
