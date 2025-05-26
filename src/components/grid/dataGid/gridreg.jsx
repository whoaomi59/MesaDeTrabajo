import React, { useState } from "react";
import * as Icons from "@heroicons/react/24/outline";
import { FolderSync } from "lucide-react";

const GridRegistros = ({ columns, data, actions, module, setRefhres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [view, setView] = useState("table"); // "table" o "cards"

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-gray-600">{module}</h1>
        <div className="flex space-x-2 items-center">
          <button
            type="button"
            class="text-white bg-green-600 hover:bg-green-700  rounded-full  p-2 "
            onClick={() => setRefhres((prev) => !prev)}
            title="Refrescar la pagina"
          >
            <FolderSync className="w-6 text-white" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded border border-green-500 ${
              view === "table"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600"
            }`}
            title="Vista tabla"
          >
            <Icons.TableCellsIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView("cards")}
            className={`p-2 rounded border border-green-500 ${
              view === "cards"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600"
            }`}
            title="Vista tarjetas"
          >
            <Icons.Squares2X2Icon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {view === "table" ? (
        <div className="w-full overflow-x-auto rounded-xl shadow-sm bg-white">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-green-600 text-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell"
                  >
                    {col.label}
                  </th>
                ))}
                {actions?.length > 0 && (
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition  ${
                    row.estado === "pendiente"
                      ? "bg-gray-200"
                      : row.estado === "en proceso"
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {/* Para pantallas grandes */}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-gray-800 sm:table-cell"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                  {actions?.length > 0 && (
                    <td className="px-4 py-3  sm:table-cell">
                      <div className="flex gap-2 flex-wrap">
                        {actions.map((action, index) => {
                          const IconComponent = Icons[action.icon];
                          return (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick?.(row);
                              }}
                              title={action.label}
                              className={`p-2 rounded-lg hover:bg-gray-400 transition border ${action.className}`}
                            >
                              {IconComponent && (
                                <IconComponent className="w-4 h-4" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`border border-green-500 rounded-lg shadow-md p-4 ${
                row.estado === "pendiente"
                  ? "bg-gray-300"
                  : row.estado === "en proceso"
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-2">
                  <span className="font-semibold text-sm text-gray-700">
                    {col.label}:{" "}
                  </span>
                  <span className="text-sm text-gray-900">{row[col.key]}</span>
                </div>
              ))}
              {actions?.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {actions.map((action, actionIndex) => {
                    const IconComponent = Icons[action.icon];
                    return (
                      <button
                        key={actionIndex}
                        className={`p-2 rounded ${action.className} hover:bg-gray-300`}
                        title={action.label}
                        onClick={() => action.onClick?.(row)}
                      >
                        {IconComponent && <IconComponent className="w-4" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default GridRegistros;
