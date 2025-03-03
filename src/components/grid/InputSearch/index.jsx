import { useState } from "react";

export default function SearchSelect({ options, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  // Manejar la entrada del usuario
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrar opciones
    if (value) {
      setFilteredOptions(
        options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

  // Manejar la selección de un elemento
  const handleSelect = (option) => {
    setSelected(option);
    setSearchTerm(option);
    setFilteredOptions([]);
    onSelect(option); // Enviar datos
  };

  return (
    <div className="relative">
      {/* Input de búsqueda */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar..."
        className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
      />

      {/* Lista desplegable */}
      {filteredOptions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-md max-h-40 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Mostrar selección */}
      {selected && (
        <div className="mt-2 text-gray-600">
          <strong>Seleccionado:</strong> {selected}
        </div>
      )}
    </div>
  );
}
