import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaHome, FaPaw, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import Sidebar from "../../../components/SideBar/SideBar";
import "./PropietarioLayout.css";
import { links } from "./SideBardData";

const PropietarioLayout = () => {
  const nombre = localStorage.getItem("nombre") || "Usuario";
  const location = useLocation();

  return (
    <div className="propietario-layout">
      <Sidebar
        links={links}
        usuario={{ nombre, rol: "Propietario" }}
        rutaActual={location.pathname}
      />
      <div className="propietario-contenido">
        <Outlet />
      </div>
    </div>
  );
};

export default PropietarioLayout;
