import React, { useState, useEffect } from "react";

const Semaforo = () => {
  const [activeLight, setActiveLight] = useState("red");
  const [autoChange, setautoChange] = useState(true);
  const [buttonPressed, setbuttonPressed] = useState(false);

  // Cambio automático de luces cada 3 segundos
  useEffect(() => {
    let interval;
    if (autoChange) {
      interval = setInterval(() => {
        setActiveLight((prevLight) => {
          if (prevLight === "red") return "orange";
          if (prevLight === "orange") return "green";
          if (prevLight === "green") return "red";
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoChange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setautoChange(true);
    }, 10000); // Reinicia después de 10 segundos sin pulsar ninguna bola al cambio automatico
  
    return () => clearTimeout(timeout);
  }, [activeLight]);

  // Cambio de luz con el boton
  const handleButtonClick = () => {
    setbuttonPressed(true);
    setautoChange(false); // Desactivar el cambio automático al presionar el botón
    setActiveLight((prevLight) => {
      if (prevLight === "red") return "orange";
      if (prevLight === "orange") return "green";
      if (prevLight === "green") return "red";
    });
  };

  // Clickar en cada color para que te 
  const onClickLight = (color) => {
    setActiveLight(color);
    setautoChange(false); // Para el cambio automático para que se quede la bola que hemos clickado
  };
  //Semaforo pochete
  return (
    <div>
    <div className="semaforo d-flex flex-column justify-content-center align-items-center">
      <div
        className={`light red ${activeLight === "red" ? "active" : ""}`}
        onClick={() => onClickLight("red")}
      ></div>
      <div
        className={`light orange ${activeLight === "orange" ? "active" : ""}`}
        onClick={() => onClickLight("orange")}
      ></div>
      <div
        className={`light green ${activeLight === "green" ? "active" : ""}`}
        onClick={() => onClickLight("green")}
      ></div>
    </div>
    
      <button onClick={handleButtonClick} className="btn-secondary mt-5 rounded">Cambiar luz</button>
    </div>
  );
};

export default Semaforo;