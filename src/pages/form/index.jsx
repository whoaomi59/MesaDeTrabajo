import { useState } from "react";
import axios from "axios";

const tecnicosYamboro = ["Daver", "Fredy"];
const tecnicosCentro = ["Marcos Ramos", "Felipe Gomez"];

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    correo_electronico: "",
    numero_contacto: "",
    lugar_apoyo: "",
    sede: "",
    descripcion: "",
    Tecnico_asignado: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Verifica la sede y asigna el técnico correcto
    let tecnicoAsignado = "";
    if (formData.sede === "YAMBORO") {
      tecnicoAsignado =
        tecnicosYamboro[Math.floor(Math.random() * tecnicosYamboro.length)];
    } else if (formData.sede === "SENA-CENTRO") {
      tecnicoAsignado =
        tecnicosCentro[Math.floor(Math.random() * tecnicosCentro.length)];
    }

    // 🔥 Agrega el técnico asignado al formData
    const datosFinales = { ...formData, Tecnico_asignado: tecnicoAsignado };

    try {
      const response = await axios.post(
        "https://asuprocolombiasas.com/php/ApiMesaDeServicio/postSolicitudes.php",
        datosFinales
      );
      alert(response.data.message || "Solicitud enviada con éxito");
      setFormData({
        nombre_completo: "",
        correo_electronico: "",
        numero_contacto: "",
        lugar_apoyo: "",
        sede: "",
        descripcion: "",
        Tecnico_asignado: "",
      });
    } catch (error) {
      alert("Error al enviar la solicitud");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#E6F4EA] p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="./img/sena_google_forms_header.png"
            alt="SENA Logo"
            className="w-150 mx-auto"
          />
          <h1 className="text-3xl font-semibold text-gray-900 mt-2">
            Mesa de Servicio
          </h1>
          <p className="text-gray-600">Formulario de Solicitud</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 font-medium">
              Nombre completo <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Correo electrónico <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Número de contacto <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="numero_contacto"
              value={formData.numero_contacto}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Sede <span className="text-red-600">*</span>
            </label>
            <select
              name="sede"
              onChange={handleChange}
              value={formData.sede}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              <option value="">Seleccionar...</option>
              <option value="SENA-CENTRO">Sena Centro</option>
              <option value="YAMBORO">Yamboro</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Lugar donde necesita apoyo <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lugar_apoyo"
              value={formData.lugar_apoyo}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">
              Descripción de la solicitud{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-700 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
