import React, { useState } from "react";

import type { Usuario } from "@interfaces/Usuario";
import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";

import { insertEjercicio } from "@services/ejercicios";

import RespuestaItem from "./RespuestaItem";
import PistaItem from "./PistaItem";
import ExperienciaTipoItem from "./ExperienciaTipoItem";
import EnunciadoItem from "./EnunciadoItem";

interface Props {
  usuario: Usuario;
}

const FormularioEjercicio: React.FC<Props> = ({ usuario }) => {
  const [respuestaCount, setRespuestaCount] = useState(5);
  const [errors, setErrors] = useState({
    enunciado: "",
    experiencia: "",
    coste_pista: "",
    respuestasImpares: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (usuario.tipo === "admin") {
      const enunciado = formData.get("enunciado") as string;
      const tipo = formData.get("tipo") as string;
      const experiencia = parseInt(formData.get("Experiencia") as string);
      const tipo_coste_pista = formData.get("tipo_coste_pista") as string;
      const coste_pista = parseInt(formData.get("coste_pista") as string);

      let currentErrors = {
        enunciado: "",
        experiencia: "",
        coste_pista: "",
        respuestasImpares: "",
      };

      if (experiencia > 1000 || experiencia < 1) {
        currentErrors.experiencia =
          "La experiencia debe ser un número entre 1 y 1000";
      }

      if (
        tipo_coste_pista === "Vidas" &&
        (coste_pista > 5 || coste_pista < 0)
      ) {
        currentErrors.coste_pista =
          "No puedes sobrepasar el número de vidas máximo en el coste de la pista.";
      } else if (
        tipo_coste_pista === "Experiencia" &&
        (coste_pista > experiencia || coste_pista < 0)
      ) {
        currentErrors.coste_pista =
          "El coste de la pista debe ser un número entre 0 y la experiencia del ejercicio.";
      }

      const bodyEjercicio: Ejercicio = {
        enunciado,
        tipo,
        xp_base: experiencia,
        tipo_coste_pista,
        coste_pista,
      };

      let respuestaContador = 1;
      let respuestasCorrectas = 0;
      let respuestas: Respuesta[] = [];

      while (formData.has(`respuesta${respuestaContador}`)) {
        const valor = formData.get(`respuesta${respuestaContador}`);
        let respuesta: Respuesta = { texto: "", correcta: false };
        if (valor) {
          const texto = valor.toString();
          respuesta.texto = texto;

          const checkboxValor = formData.get(`correcta${respuestaContador}`);
          respuesta.correcta = checkboxValor === "on";

          if (respuesta.correcta) respuestasCorrectas++;

          respuestas.push(respuesta);
        }
        respuestaContador++;
      }

      if (
        (respuestasCorrectas % 2 !== 0 && tipo === "Parejas") ||
        respuestasCorrectas === 0
      ) {
        currentErrors.respuestasImpares =
          "Debe haber un número par de respuestas correctas en el ejercicio de tipo parejas o debe haber al menos una respuesta correcta.";
      }

      const hasErrors = Object.values(currentErrors).some((msg) => msg);
      if (!hasErrors) {
        await insertEjercicio(bodyEjercicio, respuestas);
        window.location.reload();
      } else {
        setErrors(currentErrors);
      }
    }
  };

  const agregarRespuesta = () => {
    setRespuestaCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      method="POST"
      id="formulario"
      className="flex flex-col rounded-xl border bg-slate-900 p-20 mb-2 gap-5 w-full xl:w-3/5"
      onSubmit={handleSubmit}
    >
      <header>
        <h1 className="text-4xl font-bold text-wrap text-white truncate">
          Crea un ejercicio
        </h1>
      </header>

      <details className="rounded-xl p-3 bg-red-900 border-gray-950 text-white mt-4 w-full 2xl:w-1/3 mx-auto">
        <summary className="text-2xl cursor-pointer">
          ¡A TENER EN CUENTA!
        </summary>
        <ol className="flex flex-col gap-4 p-5">
          <li>Todos los campos visibles deben ser completados.</li>
          <li>
            El coste de la pista no debe ser mayor a la experiencia del
            ejercicio o a las vidas máximas (5)
          </li>
          <li>Debe haber al menos 1 respuesta correcta.</li>
          <li>
            Si el ejercicio es de tipo parejas, el número de respuestas
            correctas debe ser par.
          </li>
          <li>
            Si no todos estos avisos son cumplidos, no se creará el ejercicio.
          </li>
        </ol>
      </details>

      <EnunciadoItem />

      {errors.enunciado && <p className="text-red-500">{errors.enunciado}</p>}

      <ExperienciaTipoItem />

      {errors.experiencia && (
        <p className="text-red-500">{errors.experiencia}</p>
      )}

      <PistaItem />

      {errors.coste_pista && (
        <p className="text-red-500">{errors.coste_pista}</p>
      )}

      <header>
        <h2 className="text-2xl font-bold text-wrap text-white mt-10 truncate">
          Agrega las respuestas del ejercicio y marca la(s) correcta(s)
        </h2>
      </header>
      <div className="flex flex-col gap-5 w-full" id="respuestas">
        {Array.from({ length: respuestaCount }, (_, i) => (
          <RespuestaItem key={i} n_respuesta={i + 1} />
        ))}
      </div>

      {errors.respuestasImpares && (
        <p className="text-red-500">{errors.respuestasImpares}</p>
      )}

      <button
        className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full md:w-1/4 mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
        type="button"
        id="agregarRespuestaBtn"
        onClick={agregarRespuesta}
      >
        Agregar respuesta
      </button>
      <button
        className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full md:w-1/4 mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
        type="submit"
        id="submitBtn"
      >
        Registrar ejercicio
      </button>
    </form>
  );
};

export default FormularioEjercicio;
