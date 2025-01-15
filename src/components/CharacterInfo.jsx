import React from "react";

function CharacterInfo({ characterData }) {
  return (
    <div className="CharacterInfo">
      <h2>{characterData.character_name}</h2>
      <img
        src={characterData.character_image}
        alt={characterData.character_name}
      />
      <p>월드: {characterData.world_name}</p>
      <p>레벨: {characterData.character_level}</p>
      <p>직업: {characterData.character_class}</p>
    </div>
  );
}

export default CharacterInfo;
