import api from "./api";

export const login = async (email, password) => {
  const respuesta = await api.post("/login", {
    email: email,
    contraseña: password,
  });

  return respuesta.data;
};

export const logout = async () => {
  await api.post("/login/logout");
};

export const refreshToken = async () => {
  const respuesta = await api.post("/login/refresh");
  return respuesta.data;
};
