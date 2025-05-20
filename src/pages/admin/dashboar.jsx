import { useEffect, useState } from "react";
import axios from "axios";
import { UsersIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { AlignEndHorizontal, BeakerIcon, UserRoundCog } from "lucide-react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  // Filtros fechas
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://asuprocolombiasas.com/php/ApiMesaDeServicio/getSolicitudes.php"
      )
      .then((res) => {
        setTickets(res.data);
        setFilteredTickets(res.data);
        calcularMetricas(res.data);
        calcularTicketsPorDia(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Al cambiar filtros
  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredTickets(tickets);
      calcularMetricas(tickets);
      calcularTicketsPorDia(tickets);
      return;
    }

    const filtered = tickets.filter((ticket) => {
      if (!ticket.Fecha_Solucion) return false;
      const fecha = new Date(ticket.Fecha_Solucion);
      if (startDate && fecha < startDate) return false;
      if (endDate && fecha > endDate) return false;
      return true;
    });

    setFilteredTickets(filtered);
    calcularMetricas(filtered);
    calcularTicketsPorDia(filtered);
  }, [startDate, endDate, tickets]);

  // Métricas: pendientes y resueltos por técnico
  const calcularMetricas = (tickets) => {
    const conteo = {};

    tickets.forEach((ticket) => {
      const tecnico = ticket.Tecnico_asignado?.trim() || "Sin asignar";
      if (!conteo[tecnico]) {
        conteo[tecnico] = { pendientes: 0, resueltos: 0 };
      }
      if (ticket.estado.toLowerCase() === "pendiente") {
        conteo[tecnico].pendientes++;
      } else {
        conteo[tecnico].resueltos++;
      }
    });

    // Convertir a array para mapear y agregar total "cantidad"
    const metricas = Object.entries(conteo).map(([tecnico, data]) => ({
      tecnico,
      pendientes: data.pendientes,
      resueltos: data.resueltos,
      cantidad: data.pendientes + data.resueltos,
    }));

    // Ordenar por total resueltos desc
    metricas.sort((a, b) => b.resueltos - a.resueltos);

    setMetrics(metricas);
  };

  // Tickets diarios: pendientes y resueltos por fecha
  const calcularTicketsPorDia = (tickets) => {
    const conteoFechas = {};

    tickets.forEach((ticket) => {
      if (!ticket.Fecha_Solucion) return;
      const fecha = ticket.Fecha_Solucion.split(" ")[0];
      if (!conteoFechas[fecha]) {
        conteoFechas[fecha] = { fecha, pendientes: 0, resueltos: 0 };
      }
      if (ticket.estado.toLowerCase() === "pendiente") {
        conteoFechas[fecha].pendientes++;
      } else {
        conteoFechas[fecha].resueltos++;
      }
    });

    const datosDiarios = Object.values(conteoFechas).sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );

    setDailyData(datosDiarios);
  };

  return (
    <div className="min-h-screen  from-indigo-50 via-white to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="flexx mb-5">
          <img
            src="/img/sena_google_forms_header.png"
            alt="logo"
            className="w-120"
          />
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <label className="mb-2 font-semibold text-green-600">Desde</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              isClearable
              placeholderText="Fecha inicio"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="mb-2 font-semibold text-green-600">Hasta</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              isClearable
              placeholderText="Fecha fin"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-indigo-300 transition-shadow">
            <div className="flex items-center mb-6">
              <UserRoundCog className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-700">
                Tickets por Técnico
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {metrics.length > 0 ? (
                metrics.map(({ tecnico, pendientes, resueltos }, i) => (
                  <li
                    key={tecnico}
                    className={`flex justify-between py-3 px-4 rounded-lg cursor-default
                      ${
                        i === 0
                          ? "bg-green-100 text-green-600 font-semibold shadow-md"
                          : "hover:bg-indigo-50"
                      }
                    `}
                  >
                    <div>
                      <div>{tecnico}</div>
                      <div className="text-sm text-gray-500">
                        Pendientes:{" "}
                        <span className="text-yellow-600 font-semibold">
                          {pendientes}
                        </span>{" "}
                        | Resueltos:{" "}
                        <span className="text-green-600 font-semibold">
                          {resueltos}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center font-mono text-lg font-bold text-indigo-900">
                      {pendientes + resueltos}
                      <span className="text-xs text-gray-400 font-normal">
                        total
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center py-4">
                  No hay técnicos asignados
                </li>
              )}
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-indigo-300 transition-shadow md:col-span-2">
            <div className="flex items-center mb-6">
              <CalendarDaysIcon className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-700">
                Tickets Pendientes vs Resueltos por Día
              </h2>
            </div>
            {dailyData.length > 0 ? (
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="fecha"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      labelFormatter={(label) => `Fecha: ${label}`}
                      formatter={(value, name) => [
                        value,
                        name === "pendientes" ? "Pendientes" : "Resueltos",
                      ]}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                      type="monotone"
                      dataKey="pendientes"
                      stroke="#D97706" // amarillo
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="resueltos"
                      stroke="#16A34A" // verde
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-10">
                No hay datos de tickets en el rango seleccionado.
              </p>
            )}
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-3xl p-6 hover:shadow-indigo-300 transition-shadow m-5">
          <div className="flex items-center mb-6">
            <AlignEndHorizontal className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-700">
              Gráfico de Barras (Total Tickets por Técnico)
            </h2>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <XAxis dataKey="tecnico" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#00A63E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
