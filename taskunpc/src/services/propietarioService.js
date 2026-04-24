import api from "./api";

export const registrarPropietario = async (datosForm) => {
  const datosParaEnviar = {
    cedula: datosForm.cedula,
    nombreCompleto: datosForm.nombreCompleto,
    telefono: datosForm.telefono,
    sexo: datosForm.sexo,
    email: datosForm.correo,
    contraseña: datosForm.contrasena,
  };

  const respuesta = await api.post("/propietarios", datosParaEnviar);
  return respuesta.data;
};
