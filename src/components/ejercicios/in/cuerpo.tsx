import React, { useState, useEffect } from "react";
import type { Ejercicio } from "@interfaces/Ejercicio";
import type { Respuesta } from "@interfaces/Respuesta";
import { realizaEjercicio } from "@services/ejercicios";
import GrupoRespuestas from "./GrupoRespuestas";
import Contador from "./contador";
import Pista from "./Pista";

interface EjercicioComponentProps {
  ejercicio?: Ejercicio;
  respuestas?: Respuesta[];
  id_usuario?: string | null;
}

const EjercicioComponent: React.FC<EjercicioComponentProps> = ({
  ejercicio,
  respuestas,
  id_usuario,
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
  const [droppedItems, setDroppedItems] = useState<Respuesta[]>([]);
  const grupos = [grupo1, grupo2, grupo3];
  const [completed, setCompleted] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [pistaUsed, setPistaUsed] = useState<boolean>(false);

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
      const performEjercicio = async () => {
        console.log(id_usuario, ejercicio?.id);
        if (ejercicio?.id && id_usuario) {
          await realizaEjercicio(id_usuario, ejercicio.id);
        }
      };

      performEjercicio();
    }
  }, [grupo1, grupo2, grupo3]);

  const dividirRespuestas = (
    respuestas: Respuesta[]
  ): [Respuesta[], Respuesta[], Respuesta[]] => {
    const tercioRespuestas = Math.floor(respuestas.length / 3);

    const grupo3 = respuestas.slice(0, tercioRespuestas);
    const grupo2 = respuestas.slice(tercioRespuestas, tercioRespuestas * 2 + 1);
    const grupo1 = respuestas.slice(tercioRespuestas * 2 + 1);

    return [grupo1, grupo2, grupo3];
  };

  const handlePista = () => {
    setPistaUsed(true);

    const gruposSinPista = grupos.map((grupo) => {
      const respuestasCorrectas = grupo.filter(
        (respuesta) => respuesta.correcta
      );
      const respuestasIncorrectas = grupo.filter(
        (respuesta) => !respuesta.correcta
      );

      if (respuestasIncorrectas.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * respuestasIncorrectas.length
        );
        const respuestasConPista = [
          ...respuestasIncorrectas.slice(0, randomIndex),
          ...respuestasIncorrectas.slice(randomIndex + 1),
        ];
        return [...respuestasCorrectas, ...respuestasConPista];
      } else {
        return grupo;
      }
    });

    setGrupo1(gruposSinPista[0]);
    setGrupo2(gruposSinPista[1]);
    setGrupo3(gruposSinPista[2]);
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

  const handleDragStart = (
    event: React.DragEvent,
    respuesta: Respuesta,
    grupoIndex: number
  ) => {
    event.dataTransfer.setData("respuesta", JSON.stringify(respuesta));
    event.dataTransfer.setData("grupoIndex", grupoIndex.toString());
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const respuestaData = event.dataTransfer.getData("respuesta");
    const grupoIndex = parseInt(event.dataTransfer.getData("grupoIndex"), 10);
    if (respuestaData) {
      const respuesta: Respuesta = JSON.parse(respuestaData);
      if (!respuesta.correcta) {
        setContainerBgColor("bg-red-900");
        setTimeout(() => {
          setContainerBgColor("bg-slate-700");
        }, 1000);
        return;
      }

      setDroppedItems((prev) => [...prev, respuesta]);

      if (grupoIndex === 0) {
        setGrupo1((prev) => prev.filter((r) => r.id !== respuesta.id));
      } else if (grupoIndex === 1) {
        setGrupo2((prev) => prev.filter((r) => r.id !== respuesta.id));
      } else if (grupoIndex === 2) {
        setGrupo3((prev) => prev.filter((r) => r.id !== respuesta.id));
      }
    }
  };

  const renderFlecha = () => (
    <div
      className={`h-full transition-colors duration-1000 rounded-xl ${containerBgColor}`}
    >
      <div className="flex h-full justify-between p-10 w-full lg:w-3/4 mx-auto">
        {grupos.map((grupo, index) => (
          <GrupoRespuestas
            key={index}
            respuestas={grupo}
            selectedResponses={selectedResponses}
            onSelect={(respuesta) => handleSelect(respuesta)}
          />
        ))}
      </div>
    </div>
  );

  const renderUnir = () => (
    <div
      className={`flex h-full w-auto rounded-xl justify-between ${containerBgColor}`}
    >
      <div className="flex h-full justify-between p-10 w-3/4 lg:w-1/2 mx-auto">
        {grupos.map((grupo, index) => (
          <GrupoRespuestas
            key={index}
            respuestas={grupo}
            selectedResponses={selectedResponses}
            onSelect={(respuesta) => handleSelect(respuesta)}
            dragAndDrop={true}
            onDragStart={(event, respuesta) =>
              handleDragStart(event, respuesta, index)
            }
          />
        ))}
      </div>

      <div
        className="h-1/2 my-auto w-1/2 mx-auto bg-zinc-800 text-white text-center p-10 rounded-xl lg:w-1/4 bg-pecera-background bg-no-repeat bg-cover"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {droppedItems.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-sky-800 rounded mb-2 w-auto mx-auto"
          >
            {item.texto}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {!completed && (
          <Pista
            ejercicio={ejercicio}
            PistaUsed={pistaUsed}
            onClick={handlePista}
          />
        )}
        <Contador isCompleted={completed} />
      </div>
      <div className="rounded-xl h-screen">
        {completed ? (
          <>
            <div className="flex flex-col items-center justify-center text-white text-center mt-4 py-4 w-full lg:w-1/2 mx-auto">
              <span className="rounded-xl p-5 bg-green-950">¡COMPLETADO!</span>
              <button
                onClick={() =>
                  (window.location.href = "/ejercicios/ejercicios")
                }
                className="flex mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Volver
              </button>
            </div>
          </>
        ) : (
          <>
            {ejercicio?.tipo === "flecha" && renderFlecha()}
            {ejercicio?.tipo === "unir" && renderUnir()}
          </>
        )}
      </div>
    </>
  );
};

export default EjercicioComponent;
