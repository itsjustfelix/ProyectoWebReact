import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaPaw,
  FaDog,
  FaStar,
} from "react-icons/fa";

export const links = [
  { to: "/admin", icono: <FaHome size={16} />, label: "Inicio" },
  {
    to: "/admin/veterinarios",
    icono: <FaUserMd size={16} />,
    label: "Veterinarios",
  },
  {
    to: "/admin/propietarios",
    icono: <FaUsers size={16} />,
    label: "Propietarios",
  },
  {
    to: "/admin/especies",
    icono: <FaPaw size={16} />,
    label: "Especies",
  },
  {
    to: "/admin/razas",
    icono: <FaDog size={16} />,
    label: "Razas",
  },
  {
    to: "/admin/especializaciones",
    icono: <FaStar size={16} />,
    label: "Especializaciones",
  },
];
