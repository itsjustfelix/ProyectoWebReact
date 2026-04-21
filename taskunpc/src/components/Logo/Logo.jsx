import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="MyVet" className="logo-img" />
      My<span>Vet</span>
    </Link>
  );
};

export default Logo;
