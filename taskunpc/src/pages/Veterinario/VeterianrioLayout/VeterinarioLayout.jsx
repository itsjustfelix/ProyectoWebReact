import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/SideBar/SideBar";
import "./VeterinarioLayout.css";
import { links } from "./SideBardData";

const VeterinarioLayout = () => {
  const nombre = localStorage.getItem("nombre") || "Veterinario";
  const rol = localStorage.getItem("rol");

  return (
    <div className="veterinario-layout">
      <Sidebar links={links} usuario={{ nombre }} rol={rol} />
      <div className="veterinario-contenido">
        <Outlet />
      </div>
    </div>
  );
};

export default VeterinarioLayout;
