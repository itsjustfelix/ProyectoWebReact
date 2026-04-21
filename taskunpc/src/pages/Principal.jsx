import React from "react";
import Hero from "../components/Principal/Hero/Hero";
import NavBar from "../components/Principal/NavBar/NavBar";
import Servicios from "../components/Principal/Servicios/Servicios";
import Beneficios from "../components/Principal/Beneficios/Beneficios";
import Redes from "../components/Principal/Redes/Redes";
import CTA from "../components/Principal/CTA/CTA";
import Footer from "../components/Principal/Footer/Footer";

const Principal = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Servicios />
      <Beneficios />
      <Redes />
      <CTA />
      <Footer />
    </>
  );
};

export default Principal;
