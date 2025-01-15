import React, { useState } from "react";
import WeeklyBossManager from "./WeeklyBossManager";

const CharacterManager = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const API_KEY = import.meta.env.VITE_NEXON_API_KEY;

  const fetchCharacter = async (name) => {
    try {
      const response = await fetch(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(
          name
        )}`,
        {
          headers: {
            "x-nxopen-api-key": API_KEY,
            accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("캐릭터 정보를 찾을 수 없습니다.");
      const { ocid } = await response.json();

      const characterResponse = await fetch(
        `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
        {
          headers: {
            "x-nxopen-api-key": API_KEY,
            accept: "application/json",
          },
        }
      );
      if (!characterResponse.ok)
        throw new Error("캐릭터 상세 정보를 가져올 수 없습니다.");
      const data = await characterResponse.json();

      const newCharacter = {
        name: data.character_name,
        world: data.world_name,
        level: data.character_level,
        job: data.character_class,
        image: data.character_image,
        bosses: [],
      };

      setCharacters((prev) => [...prev, newCharacter]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCharacterSelect = (characterName) => {
    const character = characters.find((c) => c.name === characterName);
    setSelectedCharacter(character);
  };

  const handleCharacterDelete = (characterName) => {
    setCharacters((prev) =>
      prev.filter((character) => character.name !== characterName)
    );
    if (selectedCharacter?.name === characterName) {
      setSelectedCharacter(null);
    }
  };

  const handleBossUpdate = (updatedBosses) => {
    if (!selectedCharacter) return;

    setCharacters((prev) =>
      prev.map((character) =>
        character.name === selectedCharacter.name
          ? { ...character, bosses: updatedBosses }
          : character
      )
    );

    // 총 결정석 가격 계산
    const newTotalPrice = characters.reduce((sum, char) => {
      const charPrice = char.bosses.reduce((bossSum, boss) => {
        if (boss.selectedDifficulty && boss.prices[boss.selectedDifficulty]) {
          const price =
            boss.prices[boss.selectedDifficulty] / Math.max(boss.partySize, 1);
          return bossSum + price;
        }
        return bossSum;
      }, 0);
      return sum + charPrice;
    }, 0);

    setTotalPrice(newTotalPrice);
  };

  return (
    <div className="character-manager">
      <h1>캐릭터 관리</h1>
      <input
        type="text"
        placeholder="캐릭터명을 입력하세요."
        id="search-character"
      />
      <button
        onClick={() =>
          fetchCharacter(document.getElementById("search-character").value)
        }
      >
        검색
      </button>

      <div className="character-list">
        {characters.map((character) => (
          <div key={character.name} className="character-item">
            <div>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name} />
              <p>월드: {character.world}</p>
              <p>레벨: {character.level}</p>
              <p>직업: {character.job}</p>
            </div>
            <button onClick={() => handleCharacterSelect(character.name)}>
              선택
            </button>
            <button onClick={() => handleCharacterDelete(character.name)}>
              삭제
            </button>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <>
          <h2>{selectedCharacter.name} - 보스 관리</h2>
          <WeeklyBossManager
            bosses={selectedCharacter.bosses}
            onUpdateBosses={handleBossUpdate}
          />
        </>
      )}

      <h2>총 결정석 가격</h2>
      <p>{totalPrice.toLocaleString()} 메소</p>
    </div>
  );
};

export default CharacterManager;
