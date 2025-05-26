import { useState } from "react";
import Header from "../header";
import Navbar from "../navbar";
import { Menu } from "lucide-react";

export default function Container({ children, nombre }) {
  const [statemenu, setstatemenu] = useState(false);

  const Toggle = () => {
    setstatemenu(true);
    alert("sapo");
  };

  return (
    <div className="relative font-[sans-serif] pt-[70px] h-screen">
      <Header nombre={nombre} Toggle={Toggle} />
      <div>
        <div className="flex items-start">
          <Navbar toggle={statemenu} />
          <button
            onClick={() => setstatemenu((prev) => !prev)}
            className="lg:hidden w-8 h-8 z-[300] fixed top-[74px] left-[10px] cursor-pointer bg-green-600 flex items-center justify-center rounded-full outline-none transition-all duration-500 hover:bg-green-500"
          >
            <Menu className="w-5 text-white" />
          </button>

          <section className="main-content w-full overflow-auto mt-6">
            <div className="overflow-x-auto">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
