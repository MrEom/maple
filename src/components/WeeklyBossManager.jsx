import React, { useState } from "react";
import bossData from "../data/bosses";

// 이미지 정적 임포트
import 가디언엔젤슬라임 from "../assets/images/bossimg/가디언엔젤슬라임.png";
import 더스크 from "../assets/images/bossimg/더스크.png";
import 데미안 from "../assets/images/bossimg/데미안.png";
import 듄켈 from "../assets/images/bossimg/듄켈.png";
import 루시드 from "../assets/images/bossimg/루시드.png";
import 림보 from "../assets/images/bossimg/림보.png";
import 매그너스 from "../assets/images/bossimg/매그너스.png";
import 반반 from "../assets/images/bossimg/반반.png";
import 벨룸 from "../assets/images/bossimg/벨룸.png";
import 블러드퀸 from "../assets/images/bossimg/블러드퀸.png";
import 세렌 from "../assets/images/bossimg/세렌.png";
import 스우 from "../assets/images/bossimg/스우.png";
import 시그너스 from "../assets/images/bossimg/시그너스.png";
import 윌 from "../assets/images/bossimg/윌.png";
import 자쿰 from "../assets/images/bossimg/자쿰.png";
import 진힐라 from "../assets/images/bossimg/진힐라.png";
import 카링 from "../assets/images/bossimg/카링.png";
import 칼로스 from "../assets/images/bossimg/칼로스.png";
import 파풀라투스 from "../assets/images/bossimg/파풀라투스.png";
import 피에르 from "../assets/images/bossimg/피에르.png";
import 핑크빈 from "../assets/images/bossimg/핑크빈.png";
import 힐라 from "../assets/images/bossimg/힐라.png";

// 이미지 매핑 객체
const images = {
  가디언엔젤슬라임,
  더스크,
  데미안,
  듄켈,
  루시드,
  림보,
  매그너스,
  반반,
  벨룸,
  블러드퀸,
  세렌,
  스우,
  시그너스,
  윌,
  자쿰,
  진힐라,
  카링,
  칼로스,
  파풀라투스,
  피에르,
  핑크빈,
  힐라,
};

// 보스별, 난이도별 최대 파티원 수 설정
const maxPartySizesByBoss = {
  스우: { NORMAL: 6, HARD: 6, EXTREME: 2 }, // EXTREME: 최대 2명
  림보: { NORMAL: 3, HARD: 3 }, // NORMAL, HARD: 최대 3명
};

// 특정 보스와 난이도의 최대 파티원 수를 반환
const getMaxPartySize = (bossName, difficulty) => {
  return maxPartySizesByBoss[bossName]?.[difficulty] || 6; // 기본값: 6명
};

const WeeklyBossManager = ({ updateTotalPrice }) => {
  const [selectedBosses, setSelectedBosses] = useState([]);

  // 보스 선택/해제 토글 함수
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

  // 난이도 업데이트 함수
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
              ), // 난이도 변경 시 파티원 수 제한 적용
            }
          : boss
      )
    );
  };

  // 파티원 수 업데이트 함수
  const updatePartySize = (bossName, size) => {
    setSelectedBosses((prev) =>
      prev.map((boss) =>
        boss.name === bossName
          ? {
              ...boss,
              partySize: Math.min(
                size,
                getMaxPartySize(boss.name, boss.selectedDifficulty)
              ), // 현재 난이도에 따른 최대값 제한
            }
          : boss
      )
    );
  };

  // 총 결정석 가격 계산
  const calculateTotalPrice = () => {
    const total = selectedBosses.reduce((sum, boss) => {
      if (boss.selectedDifficulty && boss.prices[boss.selectedDifficulty]) {
        const price =
          boss.prices[boss.selectedDifficulty] / Math.max(boss.partySize, 1);
        return sum + Math.floor(price); // 소수점 제거
      }
      return sum;
    }, 0);
    updateTotalPrice(total);
  };

  React.useEffect(() => {
    calculateTotalPrice();
  }, [selectedBosses]);

  return (
    <div>
      <h1>주간 보스 관리</h1>
      {/* 보스 이미지 리스트 */}
      <div className="boss-image-list">
        {bossData.map((boss) => {
          const imageSrc = images[boss.name]; // 정적 임포트된 이미지 가져오기
          return (
            <img
              key={boss.name}
              src={imageSrc}
              alt={boss.name}
              className={`boss-image ${
                selectedBosses.some((b) => b.name === boss.name)
                  ? "selected"
                  : ""
              }`}
              onClick={() => toggleBossSelection(boss.name)}
            />
          );
        })}
      </div>

      {/* 선택된 보스 상세 정보 */}
      <div className="selected-bosses">
        {selectedBosses.map((boss) => (
          <div key={boss.name} className="boss-detail">
            <h2>{boss.name}</h2>
            <div>
              난이도:
              {boss.difficulty.map((diff) => (
                <label key={diff} style={{ marginLeft: "10px" }}>
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
                  ...Array(
                    getMaxPartySize(boss.name, boss.selectedDifficulty) || 6
                  ).keys(),
                ].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
            </div>
            {boss.selectedDifficulty ? (
              boss.prices[boss.selectedDifficulty] ? (
                <p>
                  현재 가격:{" "}
                  <strong>
                    {Math.floor(
                      boss.prices[boss.selectedDifficulty] /
                        Math.max(boss.partySize, 1)
                    ).toLocaleString()}{" "}
                    메소
                  </strong>
                </p>
              ) : (
                <p>선택한 난이도의 가격 정보가 없습니다.</p>
              )
            ) : (
              <p>난이도를 선택해주세요.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyBossManager;
