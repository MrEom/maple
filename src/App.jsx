import React, { useState } from "react";
import CharacterManager from "./components/CharacterManager";
import WeeklyBossManager from "./components/WeeklyBossManager";
import CrystalCalculator from "./components/CrystalCalculator";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const addCharacter = (character) => {
    setCharacters((prev) => [
      ...prev,
      { ...character, bosses: [], totalPrice: 0 },
    ]);
  };

  const removeCharacter = (characterId) => {
    setCharacters((prev) => prev.filter((char) => char.id !== characterId));
    if (selectedCharacterId === characterId) {
      setSelectedCharacterId(null);
    }
  };

  const updateBossesForCharacter = (characterId, bosses, totalPrice) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === characterId ? { ...char, bosses, totalPrice } : char
      )
    );
  };

  const totalCrystalPrice = characters.reduce(
    (sum, char) => sum + char.totalPrice,
    0
  );

  const selectedCharacter = characters.find(
    (char) => char.id === selectedCharacterId
  );

  return (
    <div className="container">
      <CharacterManager
        characters={characters}
        addCharacter={addCharacter}
        removeCharacter={removeCharacter}
        setSelectedCharacterId={setSelectedCharacterId}
      />
      {selectedCharacter && (
        <WeeklyBossManager
          character={selectedCharacter}
          updateBossesForCharacter={updateBossesForCharacter}
        />
      )}
    </div>
  );
};

export default App;
