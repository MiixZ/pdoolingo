import type { Ejercicio } from "@interfaces/Ejercicio";
import { url } from "./comun";
import type { Respuesta } from "@interfaces/Respuesta";
import type { Data } from "@interfaces/Data";

interface respuestas {
  id_ejercicio: number;
  id_respuesta: number;
  es_correcta: boolean;
}

interface usuario_ejercicios {
  id_usuario: string;
  id_ejercicio: number;
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
  const R_result = await fetch(url + `ejercicios-respuestas/${id_ejercicio}`);
  const respuestas_ID = (await R_result.json()).data as Number[];

  const ER_Result = await fetch(url + `ejercicios-respuestas/${id_ejercicio}`, {
    method: "DELETE",
  });

  respuestas_ID.map(async (id_respuesta) => {
    const result = await fetch(url + `respuestas/${id_respuesta}`, {
      method: "DELETE",
    });
  });

  const result = await fetch(url + `ejercicios/${id_ejercicio}`, {
    method: "DELETE",
  });

  return result.json();
};

export const getRespuestas = async (id_ejercicio: Number | undefined) => {
  const result = await fetch(url + "ejercicios-respuestas/" + id_ejercicio);

  const id_respuestas = (await result.json()).data;

  let respuestas: Respuesta[] = [];
  id_respuestas.map(async (object: respuestas) => {
    const result = await fetch(url + "respuestas/" + object.id_respuesta);

    const respuesta = (await result.json()).data as Respuesta;
    respuesta.correcta = object.es_correcta;
    respuestas.push(respuesta);
  });

  return respuestas;
};

export const realizaEjercicio = async (
  id_usuario: string,
  id_ejercicio: Number
) => {
  const result = await fetch(url + "usuario-ejercicios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id_usuario, id_ejercicio }),
  });

  const resultado = (await result.json()).data;
  return resultado;
};

export const xpTotalUsuario = async (id_usuario: string): Promise<number> => {
  const result = await fetch(url + "usuario-ejercicios/" + id_usuario);

  const resultados = await result.json();

  const data = resultados.data as usuario_ejercicios[];

  let xpTotal = 0;

  await Promise.all(
    data.map(async (object: usuario_ejercicios) => {
      const result = await fetch(url + "ejercicios/" + object.id_ejercicio);

      const resultado = await result.json();

      const ejercicio = resultado.data as Ejercicio;
      xpTotal += ejercicio.xp_base;
    })
  );

  return xpTotal;
};
