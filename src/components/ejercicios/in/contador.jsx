import React, { useState, useEffect } from "react";

const Contador = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex gap-4 mt-4 text-2xl text-white sm:w-full lg:w-1/2 xl:w-1/3 w-1/4">
      <h1>Tiempo transcurrido: {count}</h1>
    </div>
  );
};

export default Contador;
