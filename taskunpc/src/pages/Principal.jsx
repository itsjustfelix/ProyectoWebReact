import React from "react";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/NavBar/NavBar";
import Servicios from "../components/Servicios/Servicios";

const Principal = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Servicios />
    </>
  );
};

export default Principal;
