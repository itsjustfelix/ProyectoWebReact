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
import "./index.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
