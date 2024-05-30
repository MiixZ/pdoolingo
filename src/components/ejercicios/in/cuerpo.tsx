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
      setLineColor(bothCorrect ? "green" : "red");
      if (bothCorrect) {
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
      initialized &&
      !grupo1.some((respuesta) => respuesta.correcta) &&
      !grupo2.some((respuesta) => respuesta.correcta) &&
      !grupo3.some((respuesta) => respuesta.correcta)
    ) {
      setCompleted(true);
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

  const renderFlecha = () => {
    return (
      <div className="flex rounded-xl p-10 bg-slate-700 justify-between h-full relative">
        {grupos.map((grupo, index) => (
          <GrupoRespuestas
            key={index}
            respuestas={grupo}
            selectedResponses={selectedResponses}
            onSelect={(respuesta) => handleSelect(respuesta)}
          />
        ))}
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
  };

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
    <div className="rounded-xl h-full">
      {ejercicio?.tipo === "flecha" && renderFlecha()}
      {ejercicio?.tipo === "unir" && renderUnir()}
      {completed && (
        <div className="text-white text-center mt-4 bg-black">¡Completado!</div>
      )}
    </div>
  );
};

export default EjercicioComponent;
