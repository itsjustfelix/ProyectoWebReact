import { FaCalendarAlt, FaHome, FaPaw, FaClipboardList } from "react-icons/fa";
export const links = [
  { to: "/propietario", icono: <FaHome size={16} />, label: "Inicio" },
  {
    to: "/propietario/mascotas",
    icono: <FaPaw size={16} />,
    label: "Mis mascotas",
  },
  {
    to: "/propietario/citas",
    icono: <FaCalendarAlt size={16} />,
    label: "Citas",
  },
  {
    to: "/propietario/historial",
    icono: <FaClipboardList size={16} />,
    label: "Historial médico",
  },
];
