import { useState } from "react";
import { users } from "./password";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar usuario y contraseña
    const userFound = users.find(
      (user) => user.user === username && user.password === password
    );

    if (userFound) {
      // Almacenar en localStorage
      sessionStorage.setItem("user", JSON.stringify(userFound));

      // Redireccionar o mostrar mensaje de éxito
      alert(`Bienvenido, ${userFound.name}`);
      window.location.href = "/admin"; // Cambia la ruta según tu app
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-700">Auth</h1>
        <p className="text-gray-500">Ingreso a admin Mesa de Servicio</p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Usuario */}
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-2 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Usuario"
            />
          </div>

          {/* Contraseña */}
          <div className="relative mt-4 w-full">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-2 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Contraseña"
            />
          </div>

          {/* Botón */}
          <div className="flex w-full items-center mt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 py-3 font-bold text-white"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
