import React from "react";

interface Props {
  defaultTipo?: string;
  defaultExperiencia?: number;
}

const ExperienciaTipoItem: React.FC<Props> = ({
  defaultTipo,
  defaultExperiencia,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-baseline text-black justify-between gap-5 text-xl rounded-xl transition-all w-full">
      <select
        className="rounded-sm p-2 w-full text-center bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
        id="tipo_ejer"
        name="tipo"
        defaultValue={defaultTipo}
      >
        <option value="Parejas">Parejas</option>
        <option value="Pescar">Pescar</option>
      </select>

      <input
        className="inputs rounded-xl p-1 text-center w-full bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
        type="number"
        id="xp"
        name="Experiencia"
        placeholder="Experiencia"
        defaultValue={defaultExperiencia}
        required
      />
    </div>
  );
};

export default ExperienciaTipoItem;
