import * as Icons from "@heroicons/react/24/outline";
import { ChartPie, CirclePower, QrCode, UserPen } from "lucide-react";

export default function Navbar({ toggle }) {
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/Auth";
  };

  return (
    <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
      <div
        id="sidebar-collapse-menu"
        style={{ height: "calc(100vh - 72px)" }}
        className={`bg-white shadow-lg h-screen fixed py-6 px-4 top-[70px]  z-[99] lg:min-w-[250px]${
          toggle ? "" : "lg:w-max max-lg:w-0 max-lg:invisible"
        }  transition-all duration-100`}
      >
        <div>
          <h6 className="text-[#494848] text-sm font-bold px-4">
            General Settings
          </h6>
          <ul className="mt-3 space-y-2">
            <li className="text-[#636363]">
              <a
                href="/admin"
                className="text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
              >
                <ChartPie className="w-5 mr-2 text-gray-500" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="text-[#636363]">
              <a
                href="/admin/reg"
                className="text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
              >
                <UserPen className="w-5 mr-2 text-gray-500" />
                <span>Registros</span>
              </a>
            </li>
            <li className="text-[#636363]">
              <a
                href="/QR"
                className="text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
              >
                <QrCode className="w-5 mr-2 text-gray-500" />
                <span>QR</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h6 className="text-[#494848] text-sm font-bold px-4">Actions</h6>
          <ul className="mt-3 space-y-2">
            <li>
              <button
                onClick={handleLogout}
                className="text-[#636363] text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
              >
                <CirclePower className="w-5 mr-2 text-red-500" />
                <span>Salir</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
