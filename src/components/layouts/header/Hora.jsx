import { useState, useEffect } from "react";

export default function Hora() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <h1>
      {hora.getHours().toString().padStart(2, "0")}:
      {hora.getMinutes().toString().padStart(2, "0")}:
      {hora.getSeconds().toString().padStart(2, "0")}
    </h1>
  );
}
