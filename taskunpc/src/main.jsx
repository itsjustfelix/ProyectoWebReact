import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Principal from "./pages/Principal";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Dashboard from "./pages/Propietario/Dashboard/Dashboard";
import Mascotas from "./pages/Propietario/Mascotas/Mascotas";
import Citas from "./pages/Propietario/Citas/Citas";
import Historial from "./pages/Propietario/Historial/Historial";
import PropietarioLayout from "./pages/Propietario/PropietarioLayout/PropietarioLayout";
import AdminLayout from "./pages/Administrador/adminLayout/adminLayout";
import AdminDashboard from "./pages/Administrador/Dashboard/AdminDashboard";
import Veterinarios from "./pages/Administrador/Veterinario/Veterinario";
import Propietarios from "./pages/Administrador/Propietario/Propietario";
import Especie from "./pages/Administrador/Especie/Especie";
import Especializacion from "./pages/Administrador/Especializacion/Especializacion";
import Raza from "./pages/Administrador/Raza/Raza";
import Administrador from "./pages/Administrador/Administrador/Administrador";
import MascotasAdmin from "./pages/Administrador/Mascota/Mascota";
import CitaAdmin from "./pages/Administrador/Cita/Cita";
import ConsultaAdmin from "./pages/Administrador/Consulta/Consulta";
import VeterinarioLayout from "./pages/Veterinario/VeterianrioLayout/VeterinarioLayout";
import VetDashboard from "./pages/Veterinario/Dashboard/Dashboard";
import VetCitas from "./pages/Veterinario/Citas/Citas";
import VetConsultas from "./pages/Veterinario/Consultas/Consulta";
import "./index.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import GestorSesion from "./components/ModalRefrescarSesion/GestorSesion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GestorSesion />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/propietario" element={<PropietarioLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="mascotas" element={<Mascotas />} />
          <Route path="citas" element={<Citas />} />
          <Route path="historial" element={<Historial />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="veterinarios" element={<Veterinarios />} />
          <Route path="propietarios" element={<Propietarios />} />
          <Route path="especies" element={<Especie />} />
          <Route path="especializaciones" element={<Especializacion />} />
          <Route path="razas" element={<Raza />} />
          <Route path="administradores" element={<Administrador />} />
          <Route path="mascotas" element={<MascotasAdmin />} />
          <Route path="citas" element={<CitaAdmin />} />
          <Route path="consultas" element={<ConsultaAdmin />} />
        </Route>

        <Route path="/veterinario" element={<VeterinarioLayout />}>
          <Route index element={<VetDashboard />} />
          <Route path="citas" element={<VetCitas />} />
          <Route path="consultas" element={<VetConsultas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
