import { useState } from "react";

const FilterGroup = ({ label, options, selected, onChange }) => (
  <>
    <h3 className="font-medium text-gray-500 mb-4">{label}</h3>
    <div className="flex gap-3 mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`md:text-sm font-semibold flex-1 outline outline-gray-200 py-4 md:py-3 px-3 md:px-2 rounded-lg hover:bg-gray-50 ${
            selected === option ? "filter-button-selected" : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </>
);

export default function FilterPanel({ isOpen, onClose, filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  return (
    <section className={`${isOpen ? "flex" : "hidden"} p-6 md:p-5 fixed md:absolute bg-white w-full md:w-auto top-0 md:top-[100%] left-0 bottom-0 md:bottom-[initial] right-0 md:right-6 md:left-6 z-99999 h-full md:h-auto flex-col md:border md:border-[rgba(229,231,235,1)] rounded-lg shadow-lg`}>
      <header className="relative md:hidden">
        <button className="mb-6 absolute top-0 left-0 cursor-pointer" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-primary-600"
          >
            <path
              d="M10 19L3 12M3 12L10 5M3 12L21 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className="font-semibold mb-6 text-center">Filters</h2>
      </header>
      <FilterGroup
        label="Characters"
        options={["All", "Starred", "Others"]}
        selected={localFilters.character}
        onChange={(val) => handleFilterChange("character", val)}
      />
      <FilterGroup
        label="Specie"
        options={["All", "Human", "Alien"]}
        selected={localFilters.species}
        onChange={(val) => handleFilterChange("species", val)}
      />
      <button onClick={handleApply} className="w-full p-2.5 bg-gray-100 text-gray-500 hover:text-white rounded-lg font-semibold hover:bg-primary-600 mt-auto relative cursor-pointer">Filter</button>
    </section>
  );
}
