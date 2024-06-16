import { url } from "./comun";

import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";
import type { Data } from "@interfaces/Data";
import type { Insignia } from "@interfaces/Insignia";

import { getInsigniasTema } from "./temas";

interface usuario_ejercicios {
  id_usuario: string;
  id_ejercicio: number;
  xp_ganada: number;
}

export const getEjercicios = async () => {
  const result = await fetch(url + "ejercicios");

  return result.json();
};

export const getEjercicio = async (
  id: Number | undefined
): Promise<Ejercicio | null> => {
  const result = await fetch(url + `ejercicios/${id}`);

  return (await result.json()).data as Ejercicio;
};

export const getRespuestasEjercicio = async (
  id: Number | undefined
): Promise<Respuesta[]> => {
  const result = await fetch(url + `ejercicios-respuestas/${id}`);

  const data = (await result.json()) as Data;

  const respuestas = data.data.respuestas as Respuesta[];

  return respuestas;
};

export const insertEjercicio = async (
  ejercicio: Ejercicio,
  respuestas: Respuesta[]
): Promise<void> => {
  const resultEjercicio = await fetch(url + "ejercicios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...ejercicio }),
  });

  const responseEjercicio = (await resultEjercicio.json()) as Data;
  const ejercicioCreado = responseEjercicio.data as Ejercicio;

  let respuestasCreadas: Respuesta[] = [];

  respuestas.map(async (respuesta) => {
    const resultRespuesta = await fetch(url + "respuestas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto: respuesta.texto }),
    });

    const response = (await resultRespuesta.json()) as Data;
    const respuestaCreada = response.data as Respuesta;

    if (response.success) {
      respuestasCreadas.push(respuestaCreada);

      const resultAsignadas = await fetch(url + "ejercicios-respuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_ejercicio: ejercicioCreado.id,
          id_respuesta: respuestaCreada.id,
          es_correcta: respuesta.correcta,
        }),
      });

      const responseAsignadas = (await resultAsignadas.json()) as Data;
      const asignadaCreada = responseAsignadas.data;
    }
  });
};

export const deleteEjercicio = async (
  id_ejercicio: Number | undefined
): Promise<string> => {
  const ER_Result = await fetch(url + `ejercicios-respuestas/${id_ejercicio}`, {
    method: "DELETE",
  });

  const UE_Result = await fetch(url + `usuario-ejercicios/${id_ejercicio}`, {
    method: "DELETE",
  });

  const result = await fetch(url + `ejercicios/${id_ejercicio}`, {
    method: "DELETE",
  });

  return result.json();
};

export const deleteRespuestasEjercicio = async (
  id_ejercicio: Number | undefined
): Promise<string> => {
  const result = await fetch(url + `ejercicios-respuestas/${id_ejercicio}`, {
    method: "DELETE",
  });

  return result.json();
};

export const realizaEjercicio = async (
  id_usuario: string,
  id_ejercicio: Number,
  usa_pistas: boolean
) => {
  const ejercicio = await getEjercicio(id_ejercicio);
  const xp_base = ejercicio?.xp_base ?? 0;
  let xp_ganada = xp_base;

  if (ejercicio?.tipo_coste_pista === "experiencia" && usa_pistas)
    xp_ganada -= ejercicio?.coste_pista ?? 0;

  const result = await fetch(url + "usuario-ejercicios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_usuario, id_ejercicio, xp_ganada }),
  });

  await comprobarInsignias(ejercicio?.id_tema, id_usuario);

  const resultado = (await result.json()).data;

  return resultado;
};

export const comprobarInsignias = async (
  id_tema?: number,
  id_usuario?: string
) => {
  const insignias = await getInsigniasTema(id_tema);
  if (!id_usuario || !id_tema || !insignias) return;

  const xpTotal = await xpTotalPorTema(id_usuario, id_tema);
  const n_ejercicios = await ejerciciosTotalesUsuario(id_usuario, id_tema);

  await Promise.all(
    insignias.map(async (insignia: Insignia) => {
      if (
        (insignia?.xp && xpTotal >= insignia.xp) ||
        (insignia?.n_ejercicios && n_ejercicios >= insignia.n_ejercicios)
      ) {
        const result = await fetch(url + "usuarios-insignias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_usuario, id_insignia: insignia.id }),
        });
      }
    })
  );
};

export const xpTotalUsuario = async (id_usuario: string): Promise<number> => {
  const result = await fetch(url + "usuario-ejercicios/" + id_usuario);

  const resultados = await result.json();

  const data = resultados.data as usuario_ejercicios[];

  console.log("EXPERIENCIA TOTAL: ", data);

  let xpTotal = 0;

  data.map((object: usuario_ejercicios) => {
    xpTotal += object.xp_ganada;
  });

  return xpTotal;
};

export const ejerciciosTotalesUsuario = async (
  id_usuario: string,
  id_tema: number
) => {
  const result = await fetch(
    url + `usuario-ejercicios/temas/${id_usuario}/${id_tema}`
  );

  const resultados = await result.json();

  return resultados.data.length as number;
};

export const xpTotalPorTema = async (
  id_usuario: string,
  id_tema: number
): Promise<number> => {
  const result = await fetch(
    url + `usuario-ejercicios/temas/${id_usuario}/${id_tema}`
  );

  const resultados = await result.json();

  const data = resultados.data as usuario_ejercicios[];

  let xpTotal: number = 0;

  data.map((object) => {
    xpTotal += object.xp_ganada;
  });

  return xpTotal;
};
