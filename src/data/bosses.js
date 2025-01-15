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

const bosses = [
  {
    name: "자쿰",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 8980000 },
    image: 자쿰,
    cleared: false,
    partySize: 1,
  },
  {
    name: "매그너스",
    difficulty: ["HARD"],
    prices: { HARD: 10700000 },
    image: 매그너스,
    cleared: false,
    partySize: 1,
  },
  {
    name: "힐라",
    difficulty: ["HARD"],
    prices: { HARD: 6390000 },
    image: 힐라,
    cleared: false,
    partySize: 1,
  },
  {
    name: "파풀라투스",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 24700000 },
    image: 파풀라투스,
    cleared: false,
    partySize: 1,
  },
  {
    name: "피에르",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 9080000 },
    image: 피에르,
    cleared: false,
    partySize: 1,
  },
  {
    name: "반반",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 9060000 },
    image: 반반,
    cleared: false,
    partySize: 1,
  },
  {
    name: "블러드퀸",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 9040000 },
    image: 블러드퀸,
    cleared: false,
    partySize: 1,
  },
  {
    name: "벨룸",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 11600000 },
    image: 벨룸,
    cleared: false,
    partySize: 1,
  },
  {
    name: "핑크빈",
    difficulty: ["CHAOS"],
    prices: { CHAOS: 7310000 },
    image: 핑크빈,
    cleared: false,
    partySize: 1,
  },
  {
    name: "시그너스",
    difficulty: ["EASY", "NORMAL"],
    prices: { EASY: 5060000, NORMAL: 8330000 },
    image: 시그너스,
    cleared: false,
    partySize: 1,
  },
  {
    name: "스우",
    difficulty: ["NORMAL", "HARD", "EXTREME"],
    prices: { NORMAL: 31400000, HARD: 119000000, EXTREME: 392000000 },
    image: 스우,
    cleared: false,
    partySize: 1,
  },
  {
    name: "데미안",
    difficulty: ["NORMAL", "HARD"],
    prices: { NORMAL: 32900000, HARD: 113000000 },
    image: 데미안,
    cleared: false,
    partySize: 1,
  },
  {
    name: "가디언엔젤슬라임",
    difficulty: ["NORMAL", "CHAOS"],
    prices: { NORMAL: 47800000, CHAOS: 161000000 },
    image: 가디언엔젤슬라임,
    cleared: false,
    partySize: 1,
  },
  {
    name: "루시드",
    difficulty: ["EASY", "NORMAL", "HARD"],
    prices: { EASY: 49000000, NORMAL: 58600000, HARD: 135000000 },
    image: 루시드,
    cleared: false,
    partySize: 1,
  },
  {
    name: "윌",
    difficulty: ["EASY", "NORMAL", "HARD"],
    prices: { EASY: 53100000, NORMAL: 67600000, HARD: 165000000 },
    image: 윌,
    cleared: false,
    partySize: 1,
  },
  {
    name: "더스크",
    difficulty: ["NORMAL", "CHAOS"],
    prices: { NORMAL: 72400000, CHAOS: 150000000 },
    image: 더스크,
    cleared: false,
    partySize: 1,
  },
  {
    name: "진힐라",
    difficulty: ["NORMAL", "HARD"],
    prices: { NORMAL: 153000000, HARD: 200000000 },
    image: 진힐라,
    cleared: false,
    partySize: 1,
  },
  {
    name: "듄켈",
    difficulty: ["NORMAL", "HARD"],
    prices: { NORMAL: 78100000, HARD: 177000000 },
    image: 듄켈,
    cleared: false,
    partySize: 1,
  },
  {
    name: "세렌",
    difficulty: ["NORMAL", "HARD", "EXTREME"],
    prices: { NORMAL: 227000000, HARD: 314000000, EXTREME: 1340000000 },
    image: 세렌,
    cleared: false,
    partySize: 1,
  },
  {
    name: "칼로스",
    difficulty: ["EASY", "NORMAL", "CHAOS", "EXTREME"],
    prices: {
      EASY: 265000000,
      NORMAL: 364000000,
      CHAOS: 746000000,
      EXTREME: 1500000000,
    },
    image: 칼로스,
    cleared: false,
    partySize: 1,
  },
  {
    name: "카링",
    difficulty: ["EASY", "NORMAL", "HARD", "EXTREME"],
    prices: {
      EASY: 293000000,
      NORMAL: 425000000,
      HARD: 870000000,
      EXTREME: 1750000000,
    },
    image: 카링,
    cleared: false,
    partySize: 1,
  },
  {
    name: "림보",
    difficulty: ["NORMAL", "HARD"],
    prices: { NORMAL: 600000000, HARD: 1070000000 },
    image: 림보,
    cleared: false,
    partySize: 1,
  },
];

export default bosses;
