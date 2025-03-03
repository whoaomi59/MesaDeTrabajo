import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/grid/dataGid/grid";
import Loader from "../../components/contend/loader";
import LoaderTable from "../../components/contend/loaderTable";

const axiosLocal = "http://localhost/Api_MesaServicio";
const axiosOnline = "https://asuprocolombiasas.com/php/ApiMesaDeServicio";

export default function Registros() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [selectedRecord, setSelectedRecord] = useState(null); // Estado para almacenar el registro seleccionado
  const [Loaders, setLoaders] = useState(false);
  const [Refhres, setRefhres] = useState(false);

  useEffect(() => {
    const Get = async () => {
      try {
        setLoaders(true);
        const response = await axios.get(
          `${axiosLocal + "/getSolicitudes.php"}`
        );
        setLoaders(false);
        const Formater = response.data.map((item) => ({
          id: item.id,
          nombre_completo: item.nombre_completo,
          correo_electronico: item.correo_electronico,
          numero_contacto: item.numero_contacto,
          lugar_apoyo: item.lugar_apoyo,
          sede: (
            <span
              class={`bg-${
                item.sede == "YAMBORO" ? "green" : "orange"
              }-600 px-2 py-1 text-xs text-white rounded`}
            >
              {item.sede}
            </span>
          ),
          descripcion: item.descripcion,
          Fecha_hora_solicitud: item.Fecha_hora_solicitud,
          estado: item.estado,
          Tecnico_asignado: (
            <span class={`bg-blue-600 px-2 py-1 text-xs text-white rounded`}>
              {item.Tecnico_asignado}
            </span>
          ),
          comentario_solucion: item.comentario_solucion,
          Fecha_Solucion: item.Fecha_Solucion,
        }));
        console.log(Formater);
        console.log(response.data);
        setData(Formater);
      } catch (error) {
        setLoaders(false);
        return alert(error);
      }
    };
    Get();
  }, [Refhres]);

  // Función para abrir el modal y establecer el registro seleccionado
  const abrirModal = (record) => {
    setSelectedRecord(record);
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
  const guardarCambios = async () => {
    try {
      await axios.put(`${axiosLocal + "/updateSolicitud.php"}`, {
        id: selectedRecord.id,
        estado: selectedRecord.estado,
        comentario_solucion: selectedRecord.comentario_solucion,
      });

      setRefhres((prev) => !prev);

      cerrarModal();
    } catch (error) {
      alert("Error al actualizar la solicitud");
    }
  };

  return (
    <div>
      {Loaders ? (
        <LoaderTable />
      ) : (
        <Grid
          module={"Registros"}
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
          data={data}
          actions={[
            {
              icon: "PencilSquareIcon",
              className: "bg-green-600 text-white",
              onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
            },
          ]}
        />
      )}
      {/* Modal para editar estado y comentario */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000096] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Solicitud</h2>

            <label className="block mb-2">Estado:</label>
            <select
              name="estado"
              value={selectedRecord?.estado || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En proceso">En proceso</option>
              <option value="Resuelto">Resuelto</option>
            </select>

            <label className="block mt-4 mb-2">Comentario de solución:</label>
            <textarea
              name="comentario_solucion"
              value={selectedRecord?.comentario_solucion || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCambios}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
