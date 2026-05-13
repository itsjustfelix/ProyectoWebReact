import React from "react";
import Sidebar from "../../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { links } from "./SideBardData";
import "./AdminLayout.css";

const AdminLayout = () => {
  const nombre = localStorage.getItem("nombre") || "Administrador";
  const rol = localStorage.getItem("rol");

  return (
    <div className="admin-layout">
      <Sidebar links={links} usuario={{ nombre }} rol={rol} />
      <div className="admin-contenido">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
