import { useEffect, useState } from "react";
import { users } from "./password";
import { ShieldCheck } from "lucide-react";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const userFound = users.find(
      (user) => user.user === username && user.password === password
    );

    if (userFound) {
      sessionStorage.setItem("user", JSON.stringify(userFound));
      setError(false);
      setSucces(`Bienvenido, ${userFound.name}`);
      setTimeout(() => {
        window.location.href = "/admin";
      }, 800);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <a className="flexx" href="/">
          <img
            src="/img/sena_google_forms_header.png"
            alt="logo"
            className="w-40 lg:w-90"
          />
        </a>

        <h1 className="text-center text-3xl font-bold text-gray-700">
          Ingreso
        </h1>
        <p className="text-gray-500 text-center">
          Ingreso a admin Mesa de Servicio
        </p>

        <form onSubmit={handleLogin}>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-2 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Usuario"
            />
          </div>
          <div className="relative mt-4 w-full">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-2 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder="Contraseña"
            />
          </div>
          {error && (
            <div className="bg-white mt-2">
              <div className="container">
                <div className="rounded-md bg-red-100 p-4">
                  <p className="flex items-center text-sm font-medium text-red-500">
                    <span className="pr-3">
                      <ShieldCheck className="text-red-500 w-6 h-6" />
                    </span>
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {succes && (
            <div className="bg-white mt-2">
              <div className="container">
                <div className="rounded-md bg-[#C4F9E2] p-4">
                  <p className="flex items-center text-sm font-medium text-[#004434]">
                    <span className="pr-3">
                      <ShieldCheck className="text-[#00B078] w-6 h-6" />
                    </span>
                    {succes}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full items-center mt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-green-500 py-3 font-bold text-white hover:bg-green-600"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
