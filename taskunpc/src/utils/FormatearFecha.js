export const formatearFecha = (fecha) => {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
};
