import React, { useState, useEffect } from "react";

const Contador = ({ isCompleted }) => {
  const [count, setCount] = useState(0);

  const width = isCompleted ? "w-full" : "w-1/2";

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [isCompleted]);

  return (
    <h1 className={`gap-4 text-center text-4xl text-white w-full lg:${width}`}>
      {count}
    </h1>
  );
};

export default Contador;
