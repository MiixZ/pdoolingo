export const getEjercicios = async () => {
  const result = await fetch("http://localhost:3000/ejercicios");

  return result.json();
};

export const getEjercicio = async (id: Number | undefined) => {
  const result = await fetch(`http://localhost:3000/ejercicios/${id}`);

  return result.json();
};
