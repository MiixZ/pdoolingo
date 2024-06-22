import React from "react";

interface Props {
  defaultValue?: string;
}

const EnunciadoItem: React.FC<Props> = ({ defaultValue = "" }) => {
  return (
    <textarea
      className="inputs rounded-xl relative text-xl p-5 text-center resize-none h-auto w-full bg-gray-400 text-black truncate hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white transition-all duration-500 ease-in-out"
      id="enunciado"
      name="enunciado"
      placeholder="Agrega el enunciado del ejercicio"
      defaultValue={defaultValue}
      required
    ></textarea>
  );
};

export default EnunciadoItem;
