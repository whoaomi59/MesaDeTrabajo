import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../mock/url";
import { ArrowLeft } from "lucide-react";

export default function Detalle() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/getSolicitudes.php?id=${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Cargando solicitud...</p>;
  }

  if (!data || data.message) {
    return <p className="text-center mt-10">Solicitud no encontrada</p>;
  }

  const estados = ["pendiente", "en proceso", "resuelto"];
  const estadoIndex = estados.indexOf(data.estado?.toLowerCase());

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}

      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <a
            href="/admin/reg"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Volver"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </a>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Detalle de la Solicitud #{data.id}
            </h2>
            <p className="text-sm text-gray-500">{data.Fecha_hora_solicitud}</p>
          </div>
        </div>
      </div>

      {/* Progreso de estado */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">Estado del proceso</h3>

        <div className="flex items-center justify-between">
          {estados.map((estado, index) => (
            <div key={estado} className="flex-1 text-center">
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-white
                ${index <= estadoIndex ? "bg-green-500" : "bg-gray-300"}`}
              >
                ✓
              </div>
              <p
                className={`mt-2 text-sm capitalize ${
                  index <= estadoIndex
                    ? "text-green-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {estado}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Información del solicitante */}
      <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-4">
        <Info label="Nombre" value={data.nombre_completo} />
        <Info label="Correo" value={data.correo_electronico} />
        <Info label="Contacto" value={data.numero_contacto} />
        <Info label="Sede" value={data.sede} />
        <Info label="Lugar de apoyo" value={data.lugar_apoyo} />
        <Info label="Técnico asignado" value={data.Tecnico_asignado} />
      </div>

      {/* Descripción */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-2">Descripción del problema</h3>
        <p className="text-gray-700 whitespace-pre-line">{data.descripcion}</p>
      </div>

      {/* Solución */}
      {data.comentario_solucion && (
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold mb-2">Comentario de solución</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {data.comentario_solucion}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fecha solución: {data.Fecha_Solucion}
          </p>
        </div>
      )}

      {/* Evidencia */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">Evidencia</h3>

        {data.evidencia ? (
          <img
            src={data.evidencia}
            alt="Evidencia"
            className="max-w-md rounded-lg border shadow"
          />
        ) : (
          <p className="text-gray-400 italic">No se adjuntó evidencia</p>
        )}
      </div>
    </div>
  );
}

/* Componente reutilizable */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  );
}
