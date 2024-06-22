import React from "react";

import { deleteTema } from "@services/temas";

interface DeleteComponentProps {
  id_tema?: number;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ id_tema }) => {
  const handleDelete = async () => {
    await deleteTema(id_tema);

    window.location.reload();
  };

  return (
    <a
      href="#"
      className="flex-none"
      onClick={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <svg
        className="h-8 w-8 text-slate-300 hover:text-red-800"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </a>
  );
};

export default DeleteComponent;
