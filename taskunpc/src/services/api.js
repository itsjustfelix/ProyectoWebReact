import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const sesion = {
  mostrarModalRefrescar: null,
};

export const setMostrarModalRefrescar = (mostrar) => {
  sesion.mostrarModalRefrescar = mostrar;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const estadoCodigo = error.response?.status;
    const detalles = error.response?.data?.detail.error?.code;

    if (estadoCodigo === 401 && detalles === "TOKEN_EXPIRED") {
      if (sesion.mostrarModalRefrescar) {
        sesion.mostrarModalRefrescar(true);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
