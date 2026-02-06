export default function CharacterList({ starred, characters = [], onToggleStar, selectedId, onSelect }) {
  return (
    <ul className="">
      {characters.map((character, i) => (
        <li
          key={character.id}
          className={
            selectedId === character.id || (i > 0 && characters[i - 1].id === selectedId)
              ? ""
              : "border-t border-gray-200"
          }
        >
          <article
            onClick={() => onSelect && onSelect(character)}
            className={`cursor-pointer flex items-center p-4 gap-4 rounded-lg transition-colors ${
              selectedId === character.id ? "bg-primary-100" : ""
            } ${starred ? "pe-4" : ""}`}
          >
            <img
              src={character.image}
              alt={character.name}
              className="size-8 bg-primary-100 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{character.name}</h3>
              <p className="text-gray-500">{character.species}</p>
            </div>
            <button
              className={`ml-auto rounded-full p-1 cursor-pointer ${starred ? "bg-white" : "hover:bg-[rgba(128,84,199,0.05)]"}`}
              aria-label={starred ? "Remove from favorites" : "Mark as favorite"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar && onToggleStar(character);
              }}
            >
              {starred ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z"
                    fill="#53C629"
                    stroke="#53C629"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z"
                    stroke="#D1D5DB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
}
