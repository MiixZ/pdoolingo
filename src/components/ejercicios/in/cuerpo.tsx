import React, { useState, useEffect } from "react";
import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";
import GrupoRespuestas from "./GrupoRespuestas";

interface EjercicioComponentProps {
  ejercicio?: Ejercicio | null;
  respuestas?: Respuesta[];
}

const EjercicioComponent: React.FC<EjercicioComponentProps> = ({
  ejercicio,
  respuestas,
}) => {
  const [selectedResponses, setSelectedResponses] = useState<Respuesta[]>([]);
  const [pair, setPair] = useState<[Respuesta | null, Respuesta | null]>([
    null,
    null,
  ]);
  const [containerBgColor, setContainerBgColor] =
    useState<string>("bg-slate-700");
  const [grupo1, setGrupo1] = useState<Respuesta[]>([]);
  const [grupo2, setGrupo2] = useState<Respuesta[]>([]);
  const [grupo3, setGrupo3] = useState<Respuesta[]>([]);
  const grupos = [grupo1, grupo2, grupo3];
  const [completed, setCompleted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (respuestas) {
      const [g1, g2, g3] = dividirRespuestas(respuestas);
      setGrupo1(g1);
      setGrupo2(g2);
      setGrupo3(g3);
      setInitialized(true);
    }
  }, [respuestas]);

  useEffect(() => {
    if (pair[0] && pair[1]) {
      const bothCorrect = pair[0].correcta && pair[1].correcta;
      if (bothCorrect) {
        setContainerBgColor("bg-green-900");
        setTimeout(() => {
          setGrupo1((prev) =>
            prev.filter((r) => r !== pair[0] && r !== pair[1])
          );
          setGrupo2((prev) =>
            prev.filter((r) => r !== pair[0] && r !== pair[1])
          );
          setGrupo3((prev) =>
            prev.filter((r) => r !== pair[0] && r !== pair[1])
          );
          setPair([null, null]);
          setContainerBgColor("bg-slate-700");
        }, 1000);
      } else {
        setContainerBgColor("bg-red-900");
        setTimeout(() => {
          setPair([null, null]);
          setContainerBgColor("bg-slate-700");
        }, 1000);
      }
    }
  }, [pair]);

  useEffect(() => {
    if (
      initialized &&
      !grupo1.some((respuesta) => respuesta.correcta) &&
      !grupo2.some((respuesta) => respuesta.correcta) &&
      !grupo3.some((respuesta) => respuesta.correcta)
    ) {
      setCompleted(true);
      setContainerBgColor("bg-green-500");
    }
  }, [grupo1, grupo2, grupo3]);

  const dividirRespuestas = (
    respuestas: Respuesta[]
  ): [Respuesta[], Respuesta[], Respuesta[]] => {
    const tercioRespuestas = Math.floor(respuestas.length / 3);

    const grupo1 = respuestas.slice(0, tercioRespuestas);
    const grupo2 = respuestas.slice(tercioRespuestas, tercioRespuestas * 2);
    const grupo3 = respuestas.slice(tercioRespuestas * 2);

    return [grupo1, grupo2, grupo3];
  };

  const handleSelect = (respuesta: Respuesta) => {
    setSelectedResponses((prev) => {
      const newSelected = prev.includes(respuesta)
        ? prev.filter((r) => r !== respuesta)
        : [...prev, respuesta];

      if (newSelected.length === 2) {
        setPair([newSelected[0], newSelected[1]]);
        setSelectedResponses([]);
      } else if (newSelected.length > 2) {
        newSelected.shift();
      }
      return newSelected;
    });
  };

  const handleDragStart = (event: React.DragEvent, respuesta: Respuesta) => {};
  const handleDrop = (event: React.DragEvent) => {};

  const renderFlecha = () => (
    <div
      className={`flex rounded-xl p-10 ${containerBgColor} justify-between h-full transition-colors duration-1000`}
    >
      {grupos.map((grupo, index) => (
        <GrupoRespuestas
          key={index}
          respuestas={grupo}
          selectedResponses={selectedResponses}
          onSelect={(respuesta) => handleSelect(respuesta)}
        />
      ))}
    </div>
  );

  const renderUnir = () => (
    <div className="unir-container">
      {respuestas?.map((respuesta, index) => (
        <div
          key={index}
          className="response"
          draggable
          onDragStart={(event) => handleDragStart(event, respuesta)}
        >
          {respuesta.texto}
        </div>
      ))}
      <div
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        Arrastra aquí
      </div>
    </div>
  );

  return (
    <div className="rounded-xl h-auto">
      {completed ? (
        <div className="flex flex-col items-center justify-center text-white text-center mt-4 py-4 w-full lg:w-1/2 mx-auto">
          <span className="rounded-xl p-5 bg-green-950">¡COMPLETADO!</span>
          <button
            onClick={() => (window.location.href = "/ejercicios/ejercicios")}
            className="flex mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Volver
          </button>
        </div>
      ) : (
        <>
          {ejercicio?.tipo === "flecha" && renderFlecha()}
          {ejercicio?.tipo === "unir" && renderUnir()}
        </>
      )}
    </div>
  );
};

export default EjercicioComponent;
