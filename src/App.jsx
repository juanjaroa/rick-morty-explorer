import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import AppLayout from "@/layout/AppLayout"
import Sidebar from "@/layout/Sidebar"
import DetailPanel from "@/layout/DetailPanel"

export default function App() {
  const [starredCharacters, setStarredCharacters] = useState([]);
  const navigate = useNavigate();
  const match = useMatch("/character/:slug");
  
  // Extraer ID del slug (ej: "rick-sanchez-1" -> "1")
  const selectedId = match?.params?.slug?.split("-").pop();

  const handleToggleStar = (character) => {
    setStarredCharacters((prev) => {
      if (prev.some((c) => c.id === character.id)) {
        return prev.filter((c) => c.id !== character.id);
      }
      return [...prev, character];
    });
  };

  const handleCharacterSelect = (character) => {
    // Crear slug: "Rick Sanchez" -> "rick-sanchez" + "-" + id
    const slugName = character.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    navigate(`/character/${slugName}-${character.id}`);
  };

  return (
    <AppLayout
      sidebar={
        <Sidebar
          selectedId={selectedId}
          onCharacterSelect={handleCharacterSelect}
          starredCharacters={starredCharacters}
          onToggleStar={handleToggleStar}
        />
      }
      detail={
        selectedId ? (
          <DetailPanel
            characterId={selectedId}
            starred={starredCharacters.some((c) => c.id === selectedId)}
            onClose={() => navigate("/")}
          />
        ) : null
      }
    />
  );
}
