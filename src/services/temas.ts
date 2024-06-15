import { url } from "./comun";

import type { Tema } from "@interfaces/Tema";
import type { Data } from "@interfaces/Data";
import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Insignia } from "@interfaces/Insignia";

interface usuarios_insignias {
  id_usuario: string;
  id_insignia: number;
}

export const getTemas = async (): Promise<Tema[] | null> => {
  const result = await fetch(url + "temas");

  const data = (await result.json()) as Data;
  const temas = data.data as Tema[];

  await Promise.all(
    temas.map(async (tema) => {
      tema.ejercicios = await getEjerciciosTema(tema.id);
    })
  );

  await Promise.all(
    temas.map(async (tema) => {
      tema.insignias = await getInsigniasTema(tema.id);
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

export const getInsigniasTema = async (
  id: number | undefined
): Promise<Insignia[] | null> => {
  const result = await fetch(url + `insignias/tema/${id}`);

  const insigniasData = (await result.json()) as Data;

  return insigniasData.data as Insignia[];
};

export const getInsigniasConseguidas = async (
  id_usuario?: string
): Promise<usuarios_insignias[] | null> => {
  const result = await fetch(url + `usuarios-insignias/${id_usuario}`);

  const insigniasData = (await result.json()) as Data;

  return insigniasData.data as usuarios_insignias[];
};
