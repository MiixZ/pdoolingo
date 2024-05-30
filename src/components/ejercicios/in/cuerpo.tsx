// EjercicioComponent.tsx
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
  const [lineColor, setLineColor] = useState<string | null>(null);
  const [grupo1, setGrupo1] = useState<Respuesta[]>([]);
  const [grupo2, setGrupo2] = useState<Respuesta[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (respuestas) {
      const [g1, g2] = dividirRespuestas(respuestas);
      setGrupo1(g1);
      setGrupo2(g2);
    }
  }, [respuestas]);

  useEffect(() => {
    if (pair[0] && pair[1]) {
      const bothCorrect = pair[0].correcta && pair[1].correcta;
      setLineColor(bothCorrect ? "green" : "red");
      if (bothCorrect) {
        setTimeout(() => {
          setGrupo1((prev) => prev.filter((r) => r !== pair[0]));
          setGrupo2((prev) => prev.filter((r) => r !== pair[1]));
          setPair([null, null]);
          setLineColor(null);
        }, 1000);
      } else {
        setTimeout(() => {
          setLineColor(null);
          setPair([null, null]);
        }, 2000);
      }
    }
  }, [pair]);

  useEffect(() => {
    if (
      grupo1.length > 0 &&
      grupo2.length > 0 &&
      !grupo1.some((respuesta) => respuesta.correcta) &&
      !grupo2.some((respuesta) => respuesta.correcta)
    ) {
      setCompleted(true);
    }
  }, [grupo1, grupo2]);

  const dividirRespuestas = (
    respuestas: Respuesta[]
  ): [Respuesta[], Respuesta[]] => {
    const correctas = respuestas.filter((respuesta) => respuesta.correcta);
    const incorrectas = respuestas.filter((respuesta) => !respuesta.correcta);

    const mitadCorrectas = Math.floor(correctas.length / 2);
    const mitadIncorrectas = Math.floor(incorrectas.length / 2);

    const grupo1 = [
      ...correctas.slice(0, mitadCorrectas),
      ...incorrectas.slice(0, mitadIncorrectas),
    ];

    const grupo2 = [
      ...correctas.slice(mitadCorrectas),
      ...incorrectas.slice(mitadIncorrectas),
    ];

    return [grupo1, grupo2];
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
    <div className="flex rounded-xl p-10 bg-slate-700 justify-between h-auto relative">
      <GrupoRespuestas
        respuestas={grupo1}
        selectedResponses={selectedResponses}
        onSelect={(respuesta) => handleSelect(respuesta)}
      />
      <GrupoRespuestas
        respuestas={grupo2}
        selectedResponses={selectedResponses}
        onSelect={(respuesta) => handleSelect(respuesta)}
      />
      {pair[0] && pair[1] && (
        <div
          className={`absolute left-1/2 top-1/2 w-full h-full transition-all duration-2000`}
          style={{
            borderBottom: `2px solid ${lineColor}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
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
    <div className="rounded-xl">
      {ejercicio?.tipo === "flecha" && renderFlecha()}
      {ejercicio?.tipo === "unir" && renderUnir()}
      {completed && (
        <div className="text-white text-center mt-4">¡Completado!</div>
      )}
    </div>
  );
};

export default EjercicioComponent;
