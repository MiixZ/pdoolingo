export const getEjercicios = async () => {
  const result = await fetch("http://localhost:3000/ejercicios");

  return result.json();
};
