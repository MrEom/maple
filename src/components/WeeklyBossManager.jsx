import React, { useState, useEffect } from "react";
import bossData from "../data/bosses";

// 보스별 최대 파티원 수
const maxPartySizesByBoss = {
  스우: { NORMAL: 6, HARD: 6, EXTREME: 2 },
  림보: { NORMAL: 3, HARD: 3 },
};

// 보스와 난이도별 최대 파티원 수 반환
const getMaxPartySize = (bossName, difficulty) => {
  return maxPartySizesByBoss[bossName]?.[difficulty] || 6;
};

const WeeklyBossManager = ({ bosses, onUpdateBosses }) => {
  const [selectedBosses, setSelectedBosses] = useState(bosses);

  useEffect(() => {
    setSelectedBosses(bosses);
  }, [bosses]);

  // 보스 선택/해제
  const toggleBossSelection = (bossName) => {
    setSelectedBosses((prev) => {
      if (prev.some((boss) => boss.name === bossName)) {
        return prev.filter((boss) => boss.name !== bossName);
      } else {
        if (prev.length >= 12) {
          alert("보스는 최대 12개까지 선택할 수 있습니다.");
          return prev;
        }
        const boss = bossData.find((b) => b.name === bossName);
        return [...prev, { ...boss, selectedDifficulty: null, partySize: 1 }];
      }
    });
  };

  // 난이도 업데이트
  const updateDifficulty = (bossName, difficulty) => {
    setSelectedBosses((prev) =>
      prev.map((boss) =>
        boss.name === bossName
          ? {
              ...boss,
              selectedDifficulty: difficulty,
              partySize: Math.min(
                boss.partySize,
                getMaxPartySize(bossName, difficulty)
              ),
            }
          : boss
      )
    );
  };

  // 파티원 수 업데이트
  const updatePartySize = (bossName, size) => {
    setSelectedBosses((prev) =>
      prev.map((boss) =>
        boss.name === bossName
          ? {
              ...boss,
              partySize: Math.min(
                size,
                getMaxPartySize(boss.name, boss.selectedDifficulty)
              ),
            }
          : boss
      )
    );
  };

  useEffect(() => {
    onUpdateBosses(selectedBosses);
  }, [selectedBosses, onUpdateBosses]);

  return (
    <div>
      <h1>주간 보스 관리</h1>
      <div className="boss-image-list">
        {bossData.map((boss) => (
          <img
            key={boss.name}
            src={boss.image}
            alt={boss.name}
            className={`boss-image ${
              selectedBosses.some((b) => b.name === boss.name) ? "selected" : ""
            }`}
            onClick={() => toggleBossSelection(boss.name)}
          />
        ))}
      </div>
      <div className="selected-bosses">
        {selectedBosses.map((boss) => (
          <div key={boss.name} className="boss-detail">
            <h2>{boss.name}</h2>
            <div>
              난이도:
              {boss.difficulty.map((diff) => (
                <label key={diff}>
                  <input
                    type="radio"
                    name={`difficulty-${boss.name}`}
                    value={diff}
                    checked={boss.selectedDifficulty === diff}
                    onChange={() => updateDifficulty(boss.name, diff)}
                  />
                  {diff}
                </label>
              ))}
            </div>
            <div>
              파티원 수:
              <select
                value={boss.partySize}
                onChange={(e) =>
                  updatePartySize(boss.name, parseInt(e.target.value, 10))
                }
              >
                {[
                  ...Array(getMaxPartySize(boss.name, boss.selectedDifficulty)),
                ].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <p>
              현재 가격:{" "}
              <strong>
                {boss.selectedDifficulty && boss.prices[boss.selectedDifficulty]
                  ? Math.floor(
                      boss.prices[boss.selectedDifficulty] / boss.partySize
                    ).toLocaleString()
                  : "정보 없음"}
              </strong>{" "}
              메소
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyBossManager;
