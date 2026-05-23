/**
 * este util genera los bloques de horas disponibles para citas
 * los turnos son cada 30 minutos cada uno
 */
export const generarHorasDisponibles = () => {
  const horas = [];

  for (let h = 8; h < 12; h++) {
    horas.push(`${String(h).padStart(2, "0")}:00`);
    horas.push(`${String(h).padStart(2, "0")}:15`);
    horas.push(`${String(h).padStart(2, "0")}:30`);
    horas.push(`${String(h).padStart(2, "0")}:45`);
  }

  for (let h = 14; h < 18; h++) {
    horas.push(`${String(h).padStart(2, "0")}:00`);
    horas.push(`${String(h).padStart(2, "0")}:15`);
    horas.push(`${String(h).padStart(2, "0")}:30`);
    horas.push(`${String(h).padStart(2, "0")}:45`);
  }

  return horas;
};

/**
 * funcion para formatea una hora "HH:mm" a formato 12 horas con AM/PM para mostrar en el select
 */
export const formatearHoraSelect = (hora) => {
  const [h, m] = hora.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};
