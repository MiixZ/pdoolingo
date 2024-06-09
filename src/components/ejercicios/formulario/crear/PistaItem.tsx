import React from 'react';

const PistaItem: React.FC = () => {
  return (
    <>
      <header>
        <h2 className="text-2xl font-bold text-wrap text-white mt-10 truncate">Agrega la lógica de las pistas</h2>
      </header>

      <div className="flex flex-col lg:flex-row items-baseline text-black justify-between gap-5 text-xl rounded-xl transition-all w-full">
        <select className="rounded-sm p-2 w-full text-center bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out" id="tipo" name="tipo_coste_pista">
          <option value="Experiencia">Experiencia</option>
          <option value="Vidas">Vidas</option>
        </select>

        <input
          className="inputs rounded-xl p-1 text-center w-full bg-gray-400 hover:bg-zinc-800 hover:text-white focus:bg-zinc-900 focus:text-white duration-500 ease-in-out"
          type="number"
          id="coste"
          name="coste_pista"
          placeholder="Coste"
          required
        />
      </div>
    </>
  );
};

export default PistaItem;
