import React, { useState } from "react";
import WeeklyBossManager from "./WeeklyBossManager";
import CrystalCalculator from "./CrystalCalculator";

const CharacterManager = () => {
  const [character, setCharacter] = useState(null);
  const [characters, setCharacters] = useState({});
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchName, setSearchName] = useState("");
  const API_KEY = import.meta.env.VITE_NEXON_API_KEY;

  const fetchCharacter = async () => {
    try {
      const response = await fetch(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(
          searchName
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
        totalPrice: 0,
      };

      setCharacter(newCharacter);

      if (!characters[data.character_name]) {
        setCharacters((prev) => ({
          ...prev,
          [data.character_name]: newCharacter,
        }));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBossUpdate = (updatedBosses, characterName) => {
    setCharacters((prev) => {
      const updatedCharacter = {
        ...prev[characterName],
        bosses: updatedBosses,
        totalPrice: updatedBosses.reduce((sum, boss) => {
          if (boss.selectedDifficulty && boss.prices[boss.selectedDifficulty]) {
            const price =
              boss.prices[boss.selectedDifficulty] /
              Math.max(boss.partySize, 1);
            return sum + Math.floor(price);
          }
          return sum;
        }, 0),
      };

      return {
        ...prev,
        [characterName]: updatedCharacter,
      };
    });
  };

  const selectCharacter = (name) => {
    setSelectedCharacter(characters[name]);
  };

  const deleteCharacter = (name) => {
    setCharacters((prev) => {
      const updatedCharacters = { ...prev };
      delete updatedCharacters[name];
      return updatedCharacters;
    });
    setSelectedCharacter(null);
  };

  // 모든 캐릭터의 결정석 총합 계산
  const calculateTotalCrystalPrice = () => {
    return Object.values(characters).reduce(
      (sum, char) => sum + (char.totalPrice || 0),
      0
    );
  };

  return (
    <div className="character-manager">
      <h1>캐릭터 관리</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="캐릭터명을 입력하세요."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={fetchCharacter}>검색</button>
      </div>
      <div className="character-list">
        {Object.values(characters).map((char) => (
          <div key={char.name} className="character-item">
            <h2>{char.name}</h2>
            <img src={char.image} alt={char.name} />
            <p>월드: {char.world}</p>
            <p>레벨: {char.level}</p>
            <p>직업: {char.job}</p>
            <button onClick={() => selectCharacter(char.name)}>선택</button>
            <button onClick={() => deleteCharacter(char.name)}>삭제</button>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div className="selected-character">
          <h2>{selectedCharacter.name} - 보스 관리</h2>
          <WeeklyBossManager
            bosses={selectedCharacter.bosses}
            onUpdateBosses={(updatedBosses) =>
              handleBossUpdate(updatedBosses, selectedCharacter.name)
            }
          />
          <h3>{selectedCharacter.name}의 총 결정석 가격</h3>
          <p>{selectedCharacter.totalPrice.toLocaleString()} 메소</p>
        </div>
      )}
      <div className="total-crystal-price">
        <h2>모든 캐릭터의 총 결정석 가격</h2>
        <CrystalCalculator totalPrice={calculateTotalCrystalPrice()} />
      </div>
    </div>
  );
};

export default CharacterManager;
