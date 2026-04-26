import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SideBar/SideBar";
import "./PropietarioLayout.css";
import { links } from "./SideBardData";

const PropietarioLayout = () => {
  const nombre = localStorage.getItem("nombre") || "Usuario";
  const rol = localStorage.getItem("rol");
  /**
   * Outlet es el espacio reservado donde se va a renderizar el contenido
   * de la ruta hija activa. funciona como un panel central que cambia
   * segun la ruta en la que este el usuario. cuando el usuario navega a
   * /propietario/mascotas, el outlet desmonta el componente anterior y
   * monta el de mascotas, sin tocar el sidebar que siempre permanece fijo
   */
  return (
    <div className="propietario-layout">
      <Sidebar links={links} usuario={{ nombre }} rol={rol} />
      <div className="propietario-contenido">
        <Outlet />
      </div>
    </div>
  );
};

export default PropietarioLayout;
