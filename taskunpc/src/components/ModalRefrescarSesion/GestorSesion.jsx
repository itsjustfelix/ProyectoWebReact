import React, { useState, useEffect } from "react";
import { setMostrarModalRefrescar } from "../../services/api";
import ModalRefrescarSesion from "./ModalRefrescarSesion";

const GestorSesion = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMostrarModalRefrescar(() => setVisible(true));
  }, []);

  if (!visible) return null;

  return <ModalRefrescarSesion onCerrar={() => setVisible(false)} />;
};

export default GestorSesion;
