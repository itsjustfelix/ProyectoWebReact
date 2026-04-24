import api from "./api";

export const login = async (email, password) => {
  const respuesta = await api.post("/login", {
    email: email,
    contraseña: password,
  });

  return respuesta.data; // Axios ya nos da el JSON listo en .data
};
