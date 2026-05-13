import { FaCalendarAlt, FaClipboardList, FaHome } from "react-icons/fa";

export const links = [
  {
    to: "/veterinario",
    icono: <FaHome size={16} />,
    label: "Inicio",
  },
  {
    to: "/veterinario/citas",
    icono: <FaCalendarAlt size={16} />,
    label: "citas",
  },
  {
    to: "/veterinario/historial",
    icono: <FaClipboardList size={16} />,
    label: "Consultas",
  },
];
