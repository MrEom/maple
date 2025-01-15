import React, { useState } from "react";
import CharacterInfo from "./CharacterInfo";

function CharacterManager() {
  const [characterName, setCharacterName] = useState("");
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState("");

  const fetchCharacterData = async () => {
    try {
      setError("");
      setCharacterData(null);

      const apiKey = import.meta.env.VITE_NEXON_API_KEY;

      // Step 1: 캐릭터 OCID 가져오기
      const response = await fetch(
        `https://open.api.nexon.com/maplestory/v1/id?character_name=${encodeURIComponent(
          characterName
        )}`,
        {
          headers: {
            "x-nxopen-api-key": apiKey,
            accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("캐릭터를 찾을 수 없습니다.");
      const { ocid } = await response.json();

      // Step 2: 캐릭터 정보 가져오기
      const characterResponse = await fetch(
        `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
        {
          headers: {
            "x-nxopen-api-key": apiKey,
            accept: "application/json",
          },
        }
      );
      if (!characterResponse.ok)
        throw new Error("캐릭터 정보를 불러올 수 없습니다.");
      const data = await characterResponse.json();
      setCharacterData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="CharacterManager">
      <h1>MapleStory Tool</h1>
      <div>
        <input
          type="text"
          placeholder="캐릭터명을 입력하세요."
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button onClick={fetchCharacterData}>검색</button>
      </div>
      {error && <p className="error">{error}</p>}
      {characterData && <CharacterInfo characterData={characterData} />}
    </div>
  );
}

export default CharacterManager;
