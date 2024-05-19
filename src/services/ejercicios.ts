import { url } from "./comun";

export const getEjercicios = async () => {
  const result = await fetch(url + "ejercicios");

  return result.json();
};

export const getEjercicio = async (id: Number | undefined) => {
  const result = await fetch(url + `ejercicios/${id}`);

  return result.json();
};
