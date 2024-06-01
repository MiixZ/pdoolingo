import React, { useState, useEffect } from "react";

const Contador = ({ isCompleted }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isCompleted]);

  return (
    <h1 className="gap-4 text-center text-4xl text-white w-full lg:w-1/2">
      {count}
    </h1>
  );
};

export default Contador;
