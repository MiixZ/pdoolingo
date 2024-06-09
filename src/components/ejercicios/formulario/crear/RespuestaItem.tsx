import React from "react";
import Checkbox from "@components/utils/checkbox";

interface Props {
  n_respuesta: number;
}

const RespuestaItem: React.FC<Props> = ({ n_respuesta }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center text-black gap-5 text-xl rounded-xl w-full">
      <input
        className="inputs rounded-xl p-1 text-center w-full bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
        type="text"
        id={`respuesta${n_respuesta}`}
        name={`respuesta${n_respuesta}`}
        placeholder="Agrega el texto de la respuesta"
        required
      />

      <Checkbox id={`correcta${n_respuesta}`} name={`correcta${n_respuesta}`} />
    </div>
  );
};

export default RespuestaItem;
