import React from "react";
import "@styles/checkboxes.css";

import type { Tema } from "@interfaces/Tema";

import { updateTema } from "@services/temas";
import type { Usuario } from "@interfaces/Usuario";

interface Props {
  tema?: Tema;
  defaultChecked?: boolean;
  usuario?: Usuario;
}

const CheckboxTema: React.FC<Props> = ({
  tema,
  usuario,
  defaultChecked = false,
}) => {
  const handleBlock = async () => {
    if (tema) {
      tema.bloqueado = !tema.bloqueado;
    }
    await updateTema(tema, usuario?.grupo);
    window.location.reload();
  };

  return (
    <div className="checkbox-wrapper-44 items-center justify-center">
      <label className="toggleButton">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          onClick={handleBlock}
        />
        <div>
          <svg viewBox="0 0 44 44">
            <path
              d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
              transform="translate(-2.000000, -2.000000)"
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default CheckboxTema;
