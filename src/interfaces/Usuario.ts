export interface Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  DNI: string;
  vidas: number;
  tipo: string;
  image: string | null | undefined;
  email: string | null | undefined;
}
