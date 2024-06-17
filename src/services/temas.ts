import { url } from "./comun";

import type { Tema } from "@interfaces/Tema";
import type { Data } from "@interfaces/Data";
import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Insignia } from "@interfaces/Insignia";

import { deleteEjercicio } from "./ejercicios";

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

export const getTema = async (id: number | undefined): Promise<Tema | null> => {
  const result = await fetch(url + `temas/${id}`);

  const data = (await result.json()) as Data;
  const tema = data.data as Tema;

  tema.ejercicios = await getEjerciciosTema(tema.id);
  tema.insignias = await getInsigniasTema(tema.id);

  return tema;
};

export const getInsignia = async (
  id: number | undefined
): Promise<Insignia | null> => {
  const result = await fetch(url + `insignias/${id}`);

  const data = (await result.json()) as Data;
  const insignia = data.data as Insignia;

  return insignia;
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

export const insertTema = async (tema: Tema): Promise<boolean> => {
  const result = await fetch(url + "temas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tema),
  });

  return result.ok;
};

export const insertInsignia = async (insignia: Insignia): Promise<boolean> => {
  const result = await fetch(url + "insignias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insignia),
  });

  console.log("RESUTADO DE INSERTAR INSIGNIA: ", await result.json());

  return result.ok;
};

export const updateTema = async (tema?: Tema): Promise<boolean> => {
  if (!tema) return false;

  const { ejercicios, insignias, ...temaToSend } = tema;

  console.log("ACTUALIZANDO TEMA: ", temaToSend);
  const result = await fetch(url + `temas/${tema.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temaToSend),
  });

  console.log("RESULTADO DE ACTUALIZAR TEMA: ", await result.json());

  return result.ok;
};

export const updateInsignia = async (insignia: Insignia): Promise<boolean> => {
  const result = await fetch(url + `insignias/${insignia.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insignia),
  });

  await fetch(url + `usuarios-insignias/insignia/delete/${insignia.id}`, {
    method: "DELETE",
  });

  return result.ok;
};

export const deleteTema = async (id: number | undefined): Promise<boolean> => {
  const ejercicios = await getEjerciciosTema(id);
  if (ejercicios) {
    await Promise.all(
      ejercicios.map(async (ejercicio) => {
        await deleteEjercicio(ejercicio.id);
      })
    );
  }

  const insignias = await getInsigniasTema(id);
  if (insignias) {
    await Promise.all(
      insignias.map(async (insignia) => {
        await deleteInsignia(insignia.id);
      })
    );
  }

  const result = await fetch(url + `temas/${id}`, {
    method: "DELETE",
  });

  console.log("RESUTADO DE ELIMINAR TEMA: ", await result.json());

  return result.ok;
};

export const deleteInsignia = async (
  id: number | undefined
): Promise<boolean> => {
  await fetch(url + `usuarios-insignias/insignia/delete/${id}`, {
    method: "DELETE",
  });

  const result = await fetch(url + `insignias/${id}`, {
    method: "DELETE",
  });

  return result.ok;
};
