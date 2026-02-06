import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "@/apollo/queries/characterQueries";

export default function DetailPanel({ starred, characterId, onClose }) {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
    skip: !characterId,
  });

  const character = data?.character;

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error loading character</div>;
  if (!character) return null;

  const details = [
    { label: "Specie", value: character.species },
    { label: "Status", value: character.status },
    { label: "Gender", value: character.gender },
    { label: "Type", value: character.type },
    { label: "Origin", value: character.origin?.name },
    { label: "Location", value: character.location?.name },
  ];

  return (
    <section className="h-full p-6 lg:px-[50px] lg:py-[40px] xl:px-[100px]">
      <article>
        <button className="md:hidden mb-6" onClick={onClose}>
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
        <header className="mb-4 flex flex-col gap-2">
          <figure className="relative size-[75px]">
            <img
              src={character.image}
              alt={character.name}
              className="size-full bg-primary-600 rounded-full"
            />
            <span className={`rounded-full bg-white p-1 absolute right-[-10px] bottom-0 ${starred ? "flex" : "hidden"}`}>
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
            </span>
          </figure>
          <h2 className="text-2xl font-bold">{character.name}</h2>
        </header>
        {details.map((item) => (
          item.value && (
            <div key={item.label} className="bottom-line py-4">
              <h3 className="font-semibold text-gray-900">{item.label}</h3>
              <p className="text-gray-500 font-medium">{item.value}</p>
            </div>
          )
        ))}
      </article>
    </section>
  );
}
