import { PlayRank } from '@prisma/client';

// 점수 범위에 따른 랭크 매핑
const RANK_RANGES: { rank: PlayRank; min: number; max: number }[] = [
  { rank: 'D', min: 0, max: 499999 },
  { rank: 'C', min: 500000, max: 599999 },
  { rank: 'B', min: 600000, max: 699999 },
  { rank: 'BB', min: 700000, max: 799999 },
  { rank: 'BBB', min: 800000, max: 849999 },
  { rank: 'A', min: 850000, max: 899999 },
  { rank: 'AA', min: 900000, max: 924999 },
  { rank: 'AAA', min: 925000, max: 949999 },
  { rank: 'S', min: 950000, max: 974999 },
  { rank: 'S_PLUS', min: 975000, max: 989999 },
  { rank: 'SS', min: 990000, max: 999999 },
  { rank: 'SS_PLUS', min: 1000000, max: 1004999 },
  { rank: 'SSS', min: 1005000, max: 1007499 },
  { rank: 'SSS_PLUS', min: 1007500, max: Number.MAX_SAFE_INTEGER },
];

/**
 * 점수에 따른 랭크 자동 계산
 * @param score 플레이 점수
 * @returns 해당하는 PlayRank
 */
export function calculateRankFromScore(score: number): PlayRank {
  const rankInfo = RANK_RANGES.find(
    (range) => score >= range.min && score <= range.max
  );
  
  if (!rankInfo) {
    // 기본값 설정 (예상하지 못한 점수 범위일 경우)
    return 'D';
  }
  
  return rankInfo.rank;
}

/**
 * 새로운 PlayRecord 생성 시 자동으로 랭크를 계산하여 추가
 */
export function createPlayRecordWithRank(data: {
  playerId: string;
  songId: string;
  difficultyCode: string;
  score: number;
  fullCombo?: boolean;
  allJustice?: boolean;
  maxCombo?: number;
  justice?: number;
  attack?: number;
  miss?: number;
  played: Date;
}) {
  const rank = calculateRankFromScore(data.score);
  
  return {
    ...data,
    rank,
  };
}
