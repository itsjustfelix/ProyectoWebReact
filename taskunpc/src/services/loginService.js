import api from "./api";

export const login = async (email, password) => {
  const respuesta = await api.post("/login", {
    email: email,
    contraseña: password,
  });

  return respuesta.data;
};
