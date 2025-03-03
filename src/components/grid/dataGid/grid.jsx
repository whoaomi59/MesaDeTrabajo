import React from "react";
import * as Icons from "@heroicons/react/24/outline";

const Grid = ({ columns, data, actions, module }) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-600 ">
        {module}
      </h1>
      <table className="min-w-full bg-white">
        <thead className="bg-green-600 whitespace-nowrap">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-4 text-left text-sm font-medium text-white"
              >
                {col.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="p-4 text-left text-sm font-medium text-white">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-blue-50">
              {columns.map((col) => (
                <td key={col.key} className="p-4 text-sm text-black">
                  {row[col.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="p-4 flex space-x-2">
                  {actions.map((action, actionIndex) => {
                    const IconComponent = Icons[action.icon]; // 📌 Cargar el icono dinámicamente
                    return (
                      <button
                        key={actionIndex}
                        className={`p-3 py-1 rounded ${action.className} hover:bg-[#0000008a]`}
                        title={action.label}
                        onClick={() => {
                          console.log("Usuario seleccionado:", row); // 📌 Verifica que `row` se pasa correctamente
                          if (typeof action.onClick === "function") {
                            action.onClick(row); // 📌 Asegura que `row` se envía
                          } else {
                            console.error(
                              "❌ Error: action.onClick no es una función."
                            );
                          }
                        }}
                      >
                        {IconComponent && <IconComponent className="w-4" />}
                        <span>{action.label}</span>
                      </button>
                    );
                  })}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
