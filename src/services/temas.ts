import { url } from "./comun";

import type { Tema } from "@interfaces/Tema";
import type { Data } from "@interfaces/Data";
import type { Ejercicio } from "@interfaces/Ejercicio";

export const getTemas = async (): Promise<Tema[] | null> => {
  const result = await fetch(url + "temas");

  const data = (await result.json()) as Data;
  const temas = data.data as Tema[];

  await Promise.all(
    temas.map(async (tema) => {
      tema.ejercicios = await getEjerciciosTema(tema.id);
    })
  );

  return data.data as Tema[];
};

export const getEjerciciosTema = async (
  id: number | undefined
): Promise<Ejercicio[] | null> => {
  const result = await fetch(url + `ejercicios/tema/${id}`);

  const ejercicios = (await result.json()) as Data;

  return ejercicios.data as Ejercicio[];
};
