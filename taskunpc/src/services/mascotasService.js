import api from "./api";

export const getMascotasByPropietario = async (codigoUsuario) => {
  const respuesta = await api.get(`/mascotas/propietario/${codigoUsuario}`);
  return respuesta.data;
};

export const saveMascota = async (mascotaData) => {
  const respuesta = await api.post("/mascotas", mascotaData);
  return respuesta.data;
};

export const uploadImagenMascota = async (archivo) => {
  const formData = new FormData();
  formData.append("file", archivo);

  const respuesta = await api.post("/mascotas/imagenes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return respuesta.data.codigo_imagen;
};

export const deleteMascota = async (codigoMascota) => {
  const respuesta = await api.delete(`/mascotas/${codigoMascota}`);
  return respuesta.data.message;
};

export const updateMascota = async (codigo_mascota, mascota) => {
  const respuesta = await api.put(`/mascotas/${codigo_mascota}`, mascota);
  return respuesta.data;
};
