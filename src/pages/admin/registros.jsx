import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoaderTable from "../../components/contend/loaderTable";
import { HomeModernIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Header from "./components/header";
import { ModelsRegistro } from "./models";
import { Verdetalle } from "./fuctions";
import { Alertas } from "../../components/contend/alert";
import GridRegistros from "../../components/grid/dataGid/gridreg";
import { WhatsAppLink } from "../../components/api/whassapp";
import {
  Bomb,
  Camera,
  CircleDot,
  FileImage,
  FolderSync,
  X,
} from "lucide-react";
import { URL } from "../../mock/url";
import Evidencias from "./components/evidencias";

export default function Registros({ sede, usuario }) {
  const [data, setData] = useState([]);
  const [dataorigin, setDataorigin] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [Loaders, setLoaders] = useState(false);
  const [Refhres, setRefhres] = useState(false);
  const [Error, setError] = useState(false);

  const [nombreFiltro, setNombreFiltro] = useState("");
  const [sedeFiltro, setSedeFiltro] = useState("");
  const [tecnicoFiltro, settecnicoFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");

  //TOMAR FOTOS Y SUBIR IMAGENES
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [isOpenS, setIsOpenS] = useState(false); // Para abrir la cámara
  const [imagenSubida, setImagenSubida] = useState(null); // Para la imagen subida
  const fileInputRef = useRef(null);

  useEffect(() => {
    const Get = async () => {
      try {
        setLoaders(true);
        const response = await axios.get(`${URL + "/getSolicitudes.php"}`);
        setLoaders(false);
        setDataorigin(response.data);
      } catch (error) {
        setLoaders(false);
        return setError(true);
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
  //Tomar Fotos
  const abrirCamara = async () => {
    setIsOpenS(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // cámara trasera en móviles
        audio: false,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error al abrir la cámara:", error);
      alert("No se pudo acceder a la cámara.");
    }
  };

  const tomarFoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);

    const imageData = canvasRef.current.toDataURL("image/png");
    setFoto(imageData);

    // Detener la cámara después de tomar la foto
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsOpenS(false);
  };

  //Subir Imagenes
  const abrirSelectorImagen = () => {
    fileInputRef.current.click();
  };

  const manejarImagenSubida = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result); // Base64
    };
    reader.readAsDataURL(file);
  };

  // Función para manejar cambios en los inputs del modal
  const handleChange = (e) => {
    setSelectedRecord({ ...selectedRecord, [e.target.name]: e.target.value });
  };

  // Función para guardar cambios en la API
  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL + "/updateSolicitud.php"}`, {
        id: selectedRecord.id,
        estado: selectedRecord.estado,
        Tecnico_asignado: selectedRecord.Tecnico_asignado,
        comentario_solucion: selectedRecord.comentario_solucion,
        evidencia: foto,
      });

      setRefhres((prev) => !prev);
      cerrarModal();
      const alertas = Alertas({
        message: "Registro Actualizado.",
        icon: "success",
      });
      return alertas;
    } catch (error) {
      const alertas = Alertas({
        message: error + "Error al actualizar la solicitud",
        icon: "error",
      });
      return alertas;
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
      console.log(item);
      return (
        (nombreFiltro === "" ||
          item.nombre_completo
            .toLowerCase()
            .includes(nombreFiltro.toLowerCase())) &&
        (sedeFiltro === "" || item.sede === sedeFiltro) &&
        (tecnicoFiltro === "" || item.Tecnico_asignado === tecnicoFiltro) &&
        (fechaFiltro === "" ||
          item.Fecha_hora_solicitud.startsWith(fechaFiltro)) &&
        (estadoFiltro === "" || item.estado === estadoFiltro)
      );
    });

    setData(filteredData);
  }, [
    nombreFiltro,
    sedeFiltro,
    fechaFiltro,
    estadoFiltro,
    dataorigin,
    tecnicoFiltro,
  ]);
  const Formater = data.map((item) => ({
    id: item.id,
    nombre_completo: item.nombre_completo,
    correo_electronico: item.correo_electronico,
    numero_contacto: (
      <WhatsAppLink
        phoneNumber={item.numero_contacto}
        message={`
  Estimado/a ${item.nombre_completo}, 
  Soy parte del equipo de Apoyo TIC del SENA. Me comunico con usted en relación con el caso radicado N° ${item.id}.  

  ¿Podría confirmarnos si el caso ha sido atendido satisfactoriamente o si requiere asistencia adicional?  

  Quedamos atentos a su confirmación para continuar con el proceso.  

  Atentamente,${usuario}  
  Equipo de Apoyo TIC - SENA  
        `}
      />
    ),
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
    estado: item.estado,
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
    <div className="mt-10 lg:mt-0">
      {Loaders ? (
        <LoaderTable />
      ) : (
        <>
          <Header />
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
                    <div class="flex flex-col">
                      <label
                        for="manufacturer"
                        class="text-sm font-medium text-stone-600"
                      >
                        Técnico Asignado
                      </label>

                      <select
                        id="manufacturer"
                        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
                        value={tecnicoFiltro}
                        onChange={(e) => settecnicoFiltro(e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Marcos Ramos">Marcos Ramos</option>
                        <option value="Felipe Gomez">Felipe Gomez</option>
                        <option value="Jhon Mario">Jhon Mario</option>
                        <option value="Daver">Daver</option>
                        <option value="Fredy">Fredy</option>
                      </select>
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

          {Error ? (
            <div class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-center w-12 bg-red-500">
                <Bomb className="text-white" />
              </div>

              <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                  <span class="font-semibold text-red-500 ">Error</span>
                  <p class="text-sm text-gray-600">
                    Error al cargar los datos, intente refrescando la página.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <GridRegistros
              module={""}
              setRefhres={setRefhres}
              columns={ModelsRegistro}
              data={Formater}
              actions={[
                {
                  icon: "PencilSquareIcon",
                  className: "bg-green-500 text-white",
                  onClick: (record) => abrirModal(record), // Llama a la función abrirModal con el registro
                },
                {
                  icon: "LinkIcon",
                  className: "bg-blue-500 text-white",
                  onClick: (record) => Verdetalle(record), // Llama a la función abrirModal con el registro
                },
              ]}
            />
          )}
        </>
      )}
      {/* Modal para editar estado y comentario */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000096] bg-opacity-50 flex justify-center items-center z-300">
          <form
            onSubmit={guardarCambios}
            className="bg-white p-5 rounded-lg shadow-lg w-120 max-h-[90vh] overflow-y-auto"
          >
            <button type="button" onClick={cerrarModal} title="Cerrar">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              ✏️ Editar Solicitud, N° {selectedRecord.id}
            </h2>
            <label className="block mb-2">Estado:</label>
            <select
              name="estado"
              value={selectedRecord?.estado || ""}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
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
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
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
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              >
                <option value="">Selecione...</option>
                <option value="Jhon Mario">Jhon Mario</option>
                <option value="Marcos Ramos">Marcos Ramos</option>
                <option value="Felipe Gomez">Felipe Gomez</option>
              </select>
            ) : sede === "yamboro" ? (
              <select
                name="Tecnico_asignado"
                value={selectedRecord?.Tecnico_asignado || ""}
                onChange={handleChange}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
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
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              required
            />
            <label className="block mt-4 mb-2">Evidencia:</label>
            {selectedRecord.evidencia ? (
              <div className="mt-4">
                <img
                  src={selectedRecord.evidencia}
                  alt="evidencia"
                  className="border-none rounded"
                />
              </div>
            ) : (
              <div>
                <div className="flex">
                  <button
                    title="Abrir Cámara"
                    type="button"
                    onClick={abrirCamara}
                    className="mr-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    <Camera />
                  </button>
                  <button
                    title="Cargar Evidencia"
                    type="button"
                    onClick={abrirSelectorImagen}
                    className="mr-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                  >
                    <FileImage />
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={manejarImagenSubida}
                    style={{ display: "none" }}
                  />
                </div>
                {isOpenS && (
                  <div className="mt-4">
                    <video
                      ref={videoRef}
                      width="400"
                      height="300"
                      autoPlay
                    ></video>
                    <div className="flexx">
                      <button
                        title="Tomar Foto"
                        onClick={tomarFoto}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700 transition-colors"
                      >
                        <CircleDot />
                      </button>
                    </div>
                  </div>
                )}{" "}
                <canvas
                  ref={canvasRef}
                  width="400"
                  height="300"
                  style={{ display: "none" }}
                ></canvas>
                {/* <pre>{JSON.stringify(foto, null, 2)}</pre> */}
                {foto && (
                  <div className="mt-4">
                    <h3>Foto capturada:</h3>
                    <img
                      src={foto}
                      alt="evidencia"
                      className="border-none rounded"
                    />
                  </div>
                )}
              </div>
            )}

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
