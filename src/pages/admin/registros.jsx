import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../../components/grid/dataGid/grid";

export default function Registros() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [selectedRecord, setSelectedRecord] = useState(null); // Estado para almacenar el registro seleccionado

  useEffect(() => {
    const Get = async () => {
      try {
        const response = await axios.get(
          `https://asuprocolombiasas.com/php/ApiMesaDeServicio/getSolicitudes.php`
        );
        setData(response.data);
      } catch (error) {
        alert(error);
      }
    };
    Get();
  }, []);

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
      await axios.put("http://localhost/Api_MesaServicio/updateSolicitud.php", {
        id: selectedRecord.id,
        estado: selectedRecord.estado,
        comentario_solucion: selectedRecord.comentario_solucion,
      });

      // Actualizar la tabla después de la edición
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedRecord.id ? selectedRecord : item
        )
      );

      cerrarModal();
    } catch (error) {
      alert("Error al actualizar la solicitud");
    }
  };

  return (
    <div>
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
          { key: "Fecha_hora_solicitud", label: "Fecha y Hora" },
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
