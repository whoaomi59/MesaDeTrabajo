import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/grid/dataGid/grid";
import LoaderTable from "../../components/contend/loaderTable";
import {
  ArrowPathIcon,
  CheckIcon,
  CubeTransparentIcon,
  HomeModernIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const axiosLocal = "http://localhost/Api_MesaServicio";
const axiosOnline = "https://asuprocolombiasas.com/php/ApiMesaDeServicio";

export default function Registros({ sede }) {
  const [data, setData] = useState([]);
  const [dataorigin, setDataorigin] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [selectedRecord, setSelectedRecord] = useState(null); // Estado para almacenar el registro seleccionado
  const [Loaders, setLoaders] = useState(false);
  const [Refhres, setRefhres] = useState(false);

  //FILTROS
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [sedeFiltro, setSedeFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  useEffect(() => {
    const Get = async () => {
      try {
        setLoaders(true);
        const response = await axios.get(
          `${axiosOnline + "/getSolicitudes.php"}`
        );
        setLoaders(false);
        setDataorigin(response.data);
      } catch (error) {
        setLoaders(false);
        return alert(error);
      }
    };
    Get();
  }, [Refhres]);

  // Función para abrir el modal y establecer el registro seleccionado
  const abrirModal = (record) => {
    const originalRecord = dataorigin.find((item) => item.id === record.id);
    setSelectedRecord(originalRecord || record);
    setIsOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsOpen(false);
    setSelectedRecord(null);
  };

  // Función para manejar cambios en los inputs del modal
  const handleChange = (e) => {
    setSelectedRecord({ ...selectedRecord, [e.target.name]: e.target.value });
  };

  // Función para guardar cambios en la API
  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${axiosOnline + "/updateSolicitud.php"}`, {
        id: selectedRecord.id,
        estado: selectedRecord.estado,
        Tecnico_asignado: selectedRecord.Tecnico_asignado,
        comentario_solucion: selectedRecord.comentario_solucion,
      });

      setRefhres((prev) => !prev);

      cerrarModal();
    } catch (error) {
      alert("Error al actualizar la solicitud");
    }
  };

  useEffect(() => {
    // 🔹 Asignar la sede del usuario solo una vez al montar el componente
    if (sede === "centro") {
      setSedeFiltro("SENA-CENTRO");
    } else if (sede === "yamboro") {
      setSedeFiltro("YAMBORO");
    }

    // 🔹 Filtrar los datos
    const filteredData = dataorigin.filter((item) => {
      return (
        (nombreFiltro === "" ||
          item.nombre_completo
            .toLowerCase()
            .includes(nombreFiltro.toLowerCase())) &&
        (sedeFiltro === "" || item.sede === sedeFiltro) &&
        (fechaFiltro === "" ||
          item.Fecha_hora_solicitud.startsWith(fechaFiltro)) &&
        (estadoFiltro === "" || item.estado === estadoFiltro)
      );
    });

    setData(filteredData);
  }, [nombreFiltro, sedeFiltro, fechaFiltro, estadoFiltro, dataorigin]); // 🔥 `sede` no está en la dependencia para evitar bucles infinitos

  const Formater = data.map((item) => ({
    id: item.id,
    nombre_completo: item.nombre_completo,
    correo_electronico: item.correo_electronico,
    numero_contacto: item.numero_contacto,
    lugar_apoyo: item.lugar_apoyo,
    sede: (
      <span
        class={`bg-${
          item.sede == "YAMBORO" ? "green" : "orange"
        }-500 px-2 py-1 text-xs text-white rounded flex`}
      >
        <HomeModernIcon className="w-4 mr-1" />
        {item.sede}
      </span>
    ),
    descripcion: item.descripcion,
    Fecha_hora_solicitud: item.Fecha_hora_solicitud,
    estado: (
      <div className="flexx">
        {item.estado === "resuelto" ? (
          <CheckIcon className="w-5 text-gray-500 mr-1" />
        ) : item.estado === "pendiente" ? (
          <CubeTransparentIcon className="w-5 text-gray-500 mr-1" />
        ) : item.estado === "en proceso" ? (
          <ArrowPathIcon className="w-5 text-gray-500 mr-1" />
        ) : (
          ""
        )}
        {item.estado}
      </div>
    ),
    Tecnico_asignado: (
      <span class={`bg-blue-500 px-2 py-1 text-xs text-white rounded flex`}>
        <UserGroupIcon className="w-4 mr-1" />
        {item.Tecnico_asignado}
      </span>
    ),
    comentario_solucion: item.comentario_solucion,
    Fecha_Solucion: item.Fecha_Solucion,
  }));

  return (
    <div>
      {Loaders ? (
        <LoaderTable />
      ) : (
        <>
          <h1 className="mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-600 ">
            Registros
          </h1>
          <div class="w-full mb-5">
            <div class="flex flex-col">
              <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <form class="">
                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div class="flex flex-col">
                      <label
                        for="name"
                        class="text-sm font-medium text-stone-600"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="eje:Juan Carlos..."
                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                        value={nombreFiltro}
                        onChange={(e) => setNombreFiltro(e.target.value)}
                      />
                    </div>
                    {sede === "admin" && (
                      <div class="flex flex-col">
                        <label
                          for="manufacturer"
                          class="text-sm font-medium text-stone-600"
                        >
                          Sede
                        </label>

                        <select
                          id="manufacturer"
                          className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                          value={sedeFiltro}
                          onChange={(e) => setSedeFiltro(e.target.value)}
                        >
                          <option value="">Seleccionar...</option>
                          <option value="SENA-CENTRO">SENA centro</option>
                          <option value="YAMBORO">Yamboro</option>
                        </select>
                      </div>
                    )}

                    <div class="flex flex-col">
                      <label
                        for="date-time"
                        class="text-sm font-medium text-stone-600"
                      >
                        Fecha Solicitud
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                        value={fechaFiltro}
                        onChange={(e) => setFechaFiltro(e.target.value)}
                      />
                    </div>

                    <div class="flex flex-col">
                      <label
                        for="status"
                        class="text-sm font-medium text-stone-600"
                      >
                        Estado
                      </label>

                      <select
                        id="status"
                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                        value={estadoFiltro}
                        onChange={(e) => setEstadoFiltro(e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="pendiente">pendiente</option>
                        <option value="en proceso">en proceso</option>
                        <option value="resuelto">resuelto</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <Grid
            module={""}
            columns={[
              { key: "id", label: "ID" },
              { key: "nombre_completo", label: "Nombre" },
              { key: "correo_electronico", label: "Correo Electrónico" },
              { key: "numero_contacto", label: "Número Contacto" },
              { key: "lugar_apoyo", label: "Lugar Apoyo" },
              { key: "sede", label: "Sede" },
              { key: "descripcion", label: "Descripción" },
              { key: "Fecha_hora_solicitud", label: "Fecha Solicitud" },
              { key: "estado", label: "Estado" },
              { key: "Tecnico_asignado", label: "Técnico Asignado" },
              { key: "comentario_solucion", label: "Comentario Solución" },
              { key: "Fecha_Solucion", label: "Fecha Solución" },
            ]}
            data={Formater}
            actions={[
              {
                icon: "PencilSquareIcon",
                className: "bg-green-600 text-white",
                onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
              },
              {
                icon: "LinkIcon",
                className: "bg-blue-600 text-white",
                onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
              },
            ]}
          />
        </>
      )}
      {/* Modal para editar estado y comentario */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000096] bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={guardarCambios}
            className="bg-white p-5 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Editar Solicitud</h2>

            <label className="block mb-2">Estado:</label>
            <select
              name="estado"
              value={selectedRecord?.estado || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione...</option>
              <option value="pendiente">Pendiente</option>
              <option value="en proceso">En proceso</option>
              <option value="resuelto">Resuelto</option>
            </select>
            <label className="block mb-2">Tecnico Asignado:</label>
            {sede === "admin" ? (
              <select
                name="Tecnico_asignado"
                value={selectedRecord?.Tecnico_asignado || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione...</option>
                <option value="Marcos Ramos">Marcos Ramos</option>
                <option value="Felipe Gomez">Felipe Gomez</option>
                <option value="Jhon Mario">Jhon Mario</option>
                <option value="Daver">Daver</option>
                <option value="Fredy">Fredy</option>
              </select>
            ) : sede === "centro" ? (
              <select
                name="Tecnico_asignado"
                value={selectedRecord?.Tecnico_asignado || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione...</option>
                <option value="Marcos Ramos">Marcos Ramos</option>
                <option value="Felipe Gomez">Felipe Gomez</option>
              </select>
            ) : sede === "yamboro" ? (
              <select
                name="Tecnico_asignado"
                value={selectedRecord?.Tecnico_asignado || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione...</option>
                <option value="Daver">Daver</option>
                <option value="Fredy">Fredy</option>
              </select>
            ) : (
              ""
            )}

            <label className="block mt-4 mb-2">Comentario de solución:</label>
            <textarea
              name="comentario_solucion"
              value={selectedRecord?.comentario_solucion || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={cerrarModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="onSubmit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
