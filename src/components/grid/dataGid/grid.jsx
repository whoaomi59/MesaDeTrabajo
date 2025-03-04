import React, { useState } from "react";
import * as Icons from "@heroicons/react/24/outline";

const Grid = ({ columns, data, actions, module }) => {
  const [expandedRows, setExpandedRows] = useState({});

  return (
    <div className="overflow-x-auto">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-600">{module}</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-green-600 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-4 text-left text-sm font-medium hidden sm:table-cell"
              >
                {col.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="p-4 text-left text-sm font-medium hidden sm:table-cell">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="even:bg-blue-50 cursor-pointer sm:table-row">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-4 text-sm text-black hidden sm:table-cell"
                  >
                    {row[col.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="p-4 space-x-2 hidden sm:table-cell">
                    {actions.map((action, actionIndex) => {
                      const IconComponent = Icons[action.icon];
                      return (
                        <button
                          key={actionIndex}
                          className={`p-2 rounded ${action.className} hover:bg-gray-300 m-0.5`}
                          title={action.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (typeof action.onClick === "function") {
                              action.onClick(row);
                            }
                          }}
                        >
                          {IconComponent && <IconComponent className="w-4" />}
                        </button>
                      );
                    })}
                  </td>
                )}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
