import React, { useState } from "react";

import type { Insignia } from "@interfaces/Insignia";

import { getEjerciciosTema } from "@services/temas";
import { insertInsignia, updateInsignia } from "@services/temas";

import AgregarItem from "@components/ejercicios/formulario/AgregarItem";

interface Props {
  insignia?: Insignia;
  id_tema?: number;
  editing?: boolean;
}

const FormularioInsignia: React.FC<Props> = ({
  insignia,
  id_tema,
  editing,
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(editing || false);
  const [errors, setErrors] = useState({
    xp: "",
    n_ejercicios: "",
  });

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const xp = parseInt(formData.get("xp") as string);
    const n_ejercicios = parseInt(formData.get("n_ejercicios") as string);

    const ejercicios_tema = await getEjerciciosTema(id_tema);

    let xp_tema = 0;

    ejercicios_tema?.map((ejercicio) => {
      xp_tema += ejercicio.xp_base;
    });

    const n_ejercicios_max = ejercicios_tema?.length;

    let currentErrors = {
      xp: "",
      n_ejercicios: "",
    };

    if (!xp && !n_ejercicios) {
      currentErrors = {
        xp: "La insignia debe tener al menos 1 requisito.",
        n_ejercicios: "La insignia debe tener al menos 1 requisito.",
      };
    }

    if (xp < 1) {
      currentErrors.xp = "La experiencia debe ser un número mayor a 0.";
    }

    if (xp > xp_tema) {
      currentErrors.xp = `El tema tiene un total de ${xp_tema} puntos de experiencia.`;
    }

    if (n_ejercicios < 1) {
      currentErrors.n_ejercicios =
        "El número de ejercicios debe ser mayor a 0.";
    }

    if (n_ejercicios_max && n_ejercicios > n_ejercicios_max) {
      currentErrors.n_ejercicios = `El tema tiene un total de ${n_ejercicios_max} ejercicios.`;
    }

    const hasErrors = Object.values(currentErrors).some((error) => error);
    if (!hasErrors) {
      const bodyInsignia: Insignia = {
        xp,
        n_ejercicios,
        id_tema,
      };

      if (editing) {
        await updateInsignia({ id: insignia?.id, ...bodyInsignia });
      } else {
        await insertInsignia(bodyInsignia);
      }
      window.location.reload();
    } else {
      setErrors(currentErrors);
    }
  };

  return (
    <div className="w-full xl:w-1/2">
      {!editing && (
        <AgregarItem
          handleClick={handleToggleFormulario}
          text="Crear insignia"
        />
      )}
      {mostrarFormulario && (
        <form
          className="flex flex-col rounded-xl border-4 border-gray-600 bg-slate-900 p-20 mb-2 gap-5 w-full"
          onSubmit={handleSubmit}
        >
          <header>
            <h1 className="text-4xl font-bold text-wrap text-white truncate">
              {editing ? "Editar insignia" : "Crear insignia"}
            </h1>
            {editing && (
              <h4>Si quieres eliminar un requisito, deja vacío el campo.</h4>
            )}
          </header>

          <input
            className="inputs rounded-xl p-1 text-center w-full bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
            type="number"
            placeholder="Experiencia requerida"
            defaultValue={insignia?.xp}
            name="xp"
          />
          <span className="text-red-500">{errors.xp}</span>

          <input
            className="inputs rounded-xl p-1 text-center w-full bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
            placeholder="Número de ejercicios requeridos"
            type="number"
            defaultValue={insignia?.n_ejercicios}
            name="n_ejercicios"
          />
          <span className="text-red-500">{errors.n_ejercicios}</span>

          <button
            className="rounded-xl p-3 bg-green-700 border-gray-950 text-white mt-4 w-full mx-auto hover:text-gray-300 hover:bg-zinc-800 transition-all duration-500"
            type="submit"
          >
            {editing ? "Editar" : "Crear"}
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioInsignia;
