import { CalendarDaysIcon, KeyIcon } from "@heroicons/react/16/solid";
import Hora from "./Hora";
import * as Icons from "lucide-react";

/* import Reloj from "./reloj"; */

export default function Header({ nombre, Toggle }) {
  return (
    <header className="flex shadow-md py-1 px-4 sm:px-7 bg-white min-h-[70px] tracking-wide z-[110] fixed top-0 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full relative">
        <a href="/">
          <img
            src="/img/sena_google_forms_header.png"
            alt="logo"
            className="w-40 lg:w-50"
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
                  <Icons.Expand className="w-5 text-green-600 hover:text-green-500 hover:w-6" />
                </button>
              </div>
              <div className="flex items-center space-x-6 max-lg:flex-wrap">
                <Icons.RadioTower className="w-5 text-gray-500 mr-1" />
                <Hora />
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
                      <Icons.Cog className="mr-2 w-5" />
                      Configuraciones
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out"
                    >
                      <Icons.Warehouse className="mr-2 w-5" />
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
