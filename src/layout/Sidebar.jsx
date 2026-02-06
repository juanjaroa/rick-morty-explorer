import { useState } from "react";
import { useQuery } from "@apollo/client";
import SearchField from "@/components/search/SearchField";
import CharacterList from "@/components/character/CharacterList";
import FilterPanel from "@/components/search/FilterPanel";
import { GET_CHARACTERS } from "@/apollo/queries/characterQueries";

const sortFunction = (order) => (a, b) => {
  if (order === "asc") {
    return a.name.localeCompare(b.name);
  }
  return b.name.localeCompare(a.name);
};

export default function Sidebar({
  selectedId,
  onCharacterSelect,
  starredCharacters,
  onToggleStar,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ character: "All", species: "All" });
  const [showFilter, setShowFilter] = useState(false);
  const [starredSortOrder, setStarredSortOrder] = useState("asc");
  const [charactersSortOrder, setCharactersSortOrder] = useState("asc");
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page: 1,
      filter: {
        name: searchTerm ? searchTerm : undefined,
        species: filters.species !== "All" ? filters.species : undefined,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const info = data?.characters?.info;

  const term = searchTerm.toLowerCase();
  const filteredStarred = starredCharacters.filter((char) =>
    char.name.toLowerCase().includes(term) &&
    (filters.species === "All" || char.species === filters.species)
  ).sort(sortFunction(starredSortOrder));

  const characters = (data?.characters?.results || []).filter(
    (char) => !starredCharacters.some((starred) => starred.id === char.id)
  ).sort(sortFunction(charactersSortOrder));

  // Lógica para el contador de resultados
  let totalResults = info?.count || 0;
  if (filters.character === "Starred") {
    totalResults = filteredStarred.length;
  } else if (filters.character === "Others") {
    totalResults = Math.max(0, (info?.count || 0) - filteredStarred.length);
  }

  const activeFiltersCount = (filters.character !== "All" ? 1 : 0) + (filters.species !== "All" ? 1 : 0);
  const hasSearchOrFilters = searchTerm || activeFiltersCount > 0;

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // No hacer nada si ya está cargando o no hay más páginas
    if (loading || !info?.next) return;

    // Cargar más cuando estemos a 100px del final
    if (scrollHeight - scrollTop < clientHeight + 100) {
      fetchMore({
        variables: {
          page: info.next,
        },
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="pt-[42px] pb-2 px-6 relative">
        <h1 className="font-greycliff font-bold text-2xl leading-loose">
          Rick and Morty list
        </h1>
        <SearchField
          onToggleFilter={() => setShowFilter(!showFilter)}
          isOpen={showFilter}
          hasFilters={filters.character !== "All" || filters.species !== "All"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterPanel
          key={showFilter}
          isOpen={showFilter}
          onClose={() => setShowFilter(false)}
          filters={filters}
          onFilterChange={setFilters}
        />
      </header>

      <nav
        aria-label="Lista de personajes"
        className="flex-1 overflow-y-auto px-4"
        onScroll={handleScroll}
      >
        {hasSearchOrFilters && (
          <div className="flex justify-between p-4 font-semibold items-center">
            <p className="text-[#2563EB]">{totalResults} Results</p>
            {activeFiltersCount > 0 && (
              <span className="bg-[rgba(99,216,56,0.2)] text-[#3B8520] text-sm py-0.25 px-3 rounded-full">
                {activeFiltersCount} Filter{activeFiltersCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}

        {(filters.character === "All" || filters.character === "Starred") && (
          <>
            <h2 className="group flex items-center text-xs font-semibold text-gray-500 p-4 sticky top-0 bg-white z-10">
              STARRED CHARACTERS ({filteredStarred.length}) 
              {filteredStarred.length > 0 && (
                <span
                  className={`ml-1 cursor-pointer ${starredSortOrder === "desc" ? "inline-block opacity-75" : "inline-block group-hover:inline-block opacity-50"}`}
                  onClick={() => setStarredSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                >
                  {starredSortOrder === "asc" ? (
                    <svg width="12" height="12" id="sort-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M160 288C147.1 288 135.4 280.2 130.4 268.2C125.4 256.2 128.2 242.5 137.4 233.4L297.4 73.4C309.9 60.9 330.2 60.9 342.7 73.4L502.7 233.4C511.9 242.6 514.6 256.3 509.6 268.3C504.6 280.3 492.9 288 480 288L160 288z"/></svg>
                  ) : (
                    <svg width="12" height="12" id="sort-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M160 352C147.1 352 135.4 359.8 130.4 371.8C125.4 383.8 128.2 397.5 137.4 406.6L297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C511.9 397.4 514.6 383.7 509.6 371.7C504.6 359.7 492.9 352 480 352L160 352z"/></svg>
                  )}
                </span>
              )}
            </h2>
            
            <CharacterList
              starred
              characters={filteredStarred}
              onToggleStar={onToggleStar}
              selectedId={selectedId}
              onSelect={onCharacterSelect}
            />
          </>
        )}
        {(filters.character === "All" || filters.character === "Others") && (
          <>
            <h2 className="group flex items-center text-xs font-semibold text-gray-500 p-4 sticky top-0 bg-white z-10">
              CHARACTERS ({info?.count || 0})
              {characters.length > 0 && (
                <span
                  className={`ml-1 cursor-pointer ${charactersSortOrder === "desc" ? "inline-block opacity-75" : "inline-block group-hover:inline-block opacity-50"}`}
                  onClick={() => setCharactersSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                >
                  {charactersSortOrder === "asc" ? (
                    <svg width="12" height="12" id="sort-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M160 288C147.1 288 135.4 280.2 130.4 268.2C125.4 256.2 128.2 242.5 137.4 233.4L297.4 73.4C309.9 60.9 330.2 60.9 342.7 73.4L502.7 233.4C511.9 242.6 514.6 256.3 509.6 268.3C504.6 280.3 492.9 288 480 288L160 288z"/></svg>
                  ) : (
                    <svg width="12" height="12" id="sort-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor"><path d="M160 352C147.1 352 135.4 359.8 130.4 371.8C125.4 383.8 128.2 397.5 137.4 406.6L297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C511.9 397.4 514.6 383.7 509.6 371.7C504.6 359.7 492.9 352 480 352L160 352z"/></svg>
                  )}
                </span>
              )}
            </h2>
            {error && <p className="p-4 text-red-500">Error: {error.message}</p>}
            <CharacterList
              characters={characters}
              onToggleStar={onToggleStar}
              selectedId={selectedId}
              onSelect={onCharacterSelect}
            />
          </>
        )}
        {loading && <p className="text-center p-4">Loading more...</p>}
      </nav>
    </div>
  );
}
