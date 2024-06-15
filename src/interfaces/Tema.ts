import type { Ejercicio } from "./Ejercicio";

export interface Tema {
  id?: number;
  titulo?: string;
  descripcion?: string;
  n_tema?: number;
  ejercicios?: Ejercicio[] | null;
}
