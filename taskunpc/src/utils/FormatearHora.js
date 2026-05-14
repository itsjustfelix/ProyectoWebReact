export const formatearHora = (hora) => {
  if (!hora) return "";
  const [horas, minutos] = hora.split(":");
  const h = parseInt(horas);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutos} ${ampm}`;
};
