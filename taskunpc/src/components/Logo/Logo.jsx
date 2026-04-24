import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Logo.css";

const Logo = ({ compacto = false, to = "/" }) => {
  return (
    <Link to={to} className="logo">
      <img src={logo} alt="" style={{ height: "36px" }} />
      {!compacto && (
        <span className="logo-nombre">
          My<span>Vet</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
