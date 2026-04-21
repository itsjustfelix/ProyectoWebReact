import {
  FaCalendarAlt,
  FaClipboardList,
  FaUserMd,
  FaFilePdf,
  FaBell,
  FaTimesCircle,
} from "react-icons/fa";

export const servicios = [
  {
    icon: <FaCalendarAlt size={32} color="#2e9cdb" />,
    titulo: "Citas en línea",
    descripcion:
      "Agenda, reagenda o cancela citas con tu veterinario en segundos, sin llamadas ni filas.",
    tag: "Disponible 24/7",
  },
  {
    icon: <FaClipboardList size={32} color="#2e9cdb" />,
    titulo: "Historia clínica digital",
    descripcion:
      "Accede en cualquier momento al historial completo de diagnósticos, tratamientos y medicamentos de tu mascota.",
    tag: "Siempre disponible",
  },
  {
    icon: <FaUserMd size={32} color="#2e9cdb" />,
    titulo: "Veterinarios especializados",
    descripcion:
      "Elige al profesional que mejor se adapte a las necesidades de tu mascota según su especialización.",
    tag: "Múltiples especialidades",
  },
  {
    icon: <FaFilePdf size={32} color="#2e9cdb" />,
    titulo: "Documentos en PDF",
    descripcion:
      "Descarga la historia clínica de tu mascota en formato PDF después de cada consulta.",
    tag: "Descarga instantánea",
  },
  {
    icon: <FaBell size={32} color="#2e9cdb" />,
    titulo: "Seguimiento de salud",
    descripcion:
      "Lleva un registro ordenado del estado de salud de cada una de tus mascotas en un solo perfil.",
    tag: "Multi-mascota",
  },
  {
    icon: <FaTimesCircle size={32} color="#2e9cdb" />,
    titulo: "Cancelación fácil",
    descripcion:
      "¿No puedes asistir? Cancela tu cita desde la app con un clic, sin llamadas ni complicaciones.",
    tag: "Sin complicaciones",
  },
];
