import React from "react";

interface Props {
  handleClick: () => void;
  text?: string;
}

const AgregarItem: React.FC<Props> = ({ handleClick, text }) => {
  return (
    <a className="flex w-auto cursor-default items-center justify-center gap-5 pt-10 text-white">
      <svg
        className="h-8 w-8 hover:text-red-800 cursor-pointer transition-all duration-500 ease-in-out"
        onClick={handleClick}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {text ? <p className="text-xl"> {text} </p> : ""}
    </a>
  );
};

export default AgregarItem;
