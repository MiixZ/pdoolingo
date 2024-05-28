import React, { useState, useEffect } from "react";
import { keyframes } from "@emotion/react";

import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";

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
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (pair[0] && pair[1]) {
      const bothCorrect = pair[0].correcta && pair[1].correcta;
      setLineColor(bothCorrect ? "green" : "red");
      if (bothCorrect) {
        grupo1 = eliminarRespuesta(pair[0], grupo1);
        grupo2 = eliminarRespuesta(pair[1], grupo2);

        console.log(
          "grupo1",
          grupo1.filter((r) => r.correcta)
        );
        console.log(
          "grupo2",
          grupo2.filter((r) => r.correcta)
        );

        if (
          grupo1.filter((r) => r.correcta).length === 0 &&
          grupo2.filter((r) => r.correcta).length === 0
        ) {
          setCompleted(true);
        }
      } else {
        setTimeout(() => {
          setLineColor(null);
          setPair([null, null]);
        }, 2000);
      }
    }
  }, [pair]);

  const eliminarRespuesta = (respuesta: Respuesta, grupo: Respuesta[]) => {
    console.log(grupo.filter((r) => r !== respuesta));
    return grupo.filter((r) => r !== respuesta);
  };

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

  let [grupo1, grupo2] = dividirRespuestas(respuestas || []);

  const handleSelect = (respuesta: Respuesta, grupo: number) => {
    setSelectedResponses((prev) => {
      const newSelected = prev.includes(respuesta)
        ? prev.filter((r) => r !== respuesta)
        : [...prev, respuesta];
      if (newSelected.length === 2) {
        setPair([newSelected[0], newSelected[1]]);
        setSelectedResponses([]);
      } else if (newSelected.length > 2) {
        console.log("newSelected", newSelected);
        newSelected.shift();
      } else {
        selectedResponses.push(respuesta);
        console.log("selectedResponses", selectedResponses);
      }
      return newSelected;
    });
  };

  const handleDragStart = (event: React.DragEvent, respuesta: Respuesta) => {};
  const handleDrop = (event: React.DragEvent) => {};

  const renderFlecha = () => (
    <div className="flex rounded-xl p-10 bg-slate-700 justify-between h-auto relative">
      <div className="flex flex-col gap-4">
        {grupo1.map((respuesta, index) => (
          <div
            key={index}
            className={`text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 hover:text-4xl rounded-xl transition-all duration-700 ease-in-out ${
              selectedResponses.includes(respuesta)
                ? "bg-zinc-500"
                : "bg-zinc-800"
            } ${index % 2 === 0 ? "animate-spin" : "animate-spin2"}`}
            onClick={() => handleSelect(respuesta, 1)}
          >
            {respuesta.texto}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {grupo2.map((respuesta, index) => (
          <div
            key={index}
            className={`text-3xl text-white text-center w-auto p-7 cursor-pointer hover:bg-zinc-500 hover:text-4xl rounded-xl transition-all duration-700 ease-in-out ${
              selectedResponses.includes(respuesta)
                ? "bg-zinc-500"
                : "bg-zinc-800"
            } ${index % 2 === 0 ? "animate-spin" : "animate-spin2"}`}
            onClick={() => handleSelect(respuesta, 2)}
          >
            {respuesta.texto}
          </div>
        ))}
      </div>
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
    <div className="rounded-xl bg-black">
      {ejercicio?.tipo === "flecha" && renderFlecha()}
      {ejercicio?.tipo === "unir" && renderUnir()}
    </div>
  );
};

export default EjercicioComponent;
