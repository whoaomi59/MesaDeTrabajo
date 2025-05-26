import { CalendarDaysIcon, KeyIcon } from "@heroicons/react/16/solid";
import Hora from "./Hora";
import { Expand } from "lucide-react";

/* import Reloj from "./reloj"; */

export default function Header({ nombre, Toggle }) {
  return (
    <header className="flex shadow-md py-1 px-4 sm:px-7 bg-white min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full relative">
        <a href="/">
          <img
            src="/img/sena_google_forms_header.png"
            alt="logo"
            className="w-50"
          />
        </a>{" "}
        <div className="lg:hidden !ml-7 outline-none">
          <Hora />
          {nombre}
        </div>
        <div className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <div className="max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <div className="flex items-center max-lg:flex-col-reverse max-lg:ml-auto gap-8">
              <div>
                <button
                  title="Expandir pantalla"
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      document.documentElement
                        .requestFullscreen()
                        .catch((err) => {
                          console.error(
                            "Error al intentar pantalla completa:",
                            err
                          );
                        });
                    } else {
                      document.exitFullscreen();
                    }
                  }}
                >
                  <Expand className="w-5 text-green-600 hover:text-green-500 hover:w-6" />
                </button>
              </div>
              <div className="flex items-center space-x-6 max-lg:flex-wrap">
                <a href="/" className="flex">
                  <CalendarDaysIcon className="w-6 text-gray-400 mr-1" />
                  <Hora />
                </a>
              </div>
              <div className="text-gray-500 flex">
                <KeyIcon className="w-5 mr-1" /> {nombre}
              </div>

              <div className="dropdown-menu relative flex shrink-0 group">
                <img
                  src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                  alt="profile-pic"
                  className="w-10 h-10 max-lg:w-16 max-lg:h-16 rounded-full border border-gray-200 cursor-pointer"
                />

                <div className="dropdown-content hidden group-hover:block shadow-md p-2 bg-white rounded-md absolute top-9 right-0 w-56">
                  <div className="w-full">
                    <a
                      href="javascript:void(0)"
                      className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-3 fill-current"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                      Configuraciones
                    </a>
                    <hr className="my-2 -mx-2" />

                    <a
                      href="javascript:void(0)"
                      className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-4 h-4 mr-3 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      Salir
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
