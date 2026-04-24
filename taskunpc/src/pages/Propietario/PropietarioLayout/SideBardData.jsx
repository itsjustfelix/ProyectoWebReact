import { FaCalendarAlt, FaHome, FaPaw, FaClipboardList } from "react-icons/fa";
export const links = [
  { to: "/propietario", icono: <FaHome size={16} />, label: "Inicio" },
  {
    to: "/propietario/mascotas",
    icono: <FaPaw size={16} />,
    label: "Mis mascotas",
    end: true,
  },
  {
    to: "/propietario/citas",
    icono: <FaCalendarAlt size={16} />,
    label: "Mis citas",
  },
  {
    to: "/propietario/historial",
    icono: <FaClipboardList size={16} />,
    label: "Historial médico",
  },
];
