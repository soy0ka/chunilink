/**
 * CHUNITHM 데이터 관련 타입 정의
 */

/**
 * CHUNITHM 플레이어 전체 데이터 인터페이스
 */
export interface ChunithmData {
  appVersion: string;
  honors: Honor[];
  name: string;
  rating: number;
  level: number;
  updatedAt: string;
  lastPlayed: string;
  friendCode: string;
  totalPlayCount: string;
  character: Character[];
  favoriteCharacter: Character;
  best: ScoreData[];
  new: ScoreData[];
  score: ScoreData[];
}

/**
 * CHUNITHM 칭호 데이터 인터페이스
 */
export interface Honor {
  type: string;
  label: string;
}

/**
 * CHUNITHM 캐릭터 데이터 인터페이스
 */
export interface Character {
  id: string;
  name: string;
  img: string;
  rank: number;
  background: string;
  isFavorite?: boolean;
}

/**
 * CHUNITHM 점수 데이터 인터페이스
 */
export interface ScoreData {
  title?: string;
  difficulty?: string;
  score?: number;
  playRank?: string;
  clearType?: string;
  comboType?: string;
  CtCType?: string;
  idx: number;
}

/**
 * 프리즈마 변환 유틸리티 타입
 */
export interface PrismaEnumMap {
  [key: string]: string;
}

/**
 * 북마크렛에 사용되는 데이터 구조
 */
export interface BookmarkletData {
  name?: string;
  level?: number;
  rating?: number;
  friendCode?: string;
  playCount?: number;
  lastPlayed?: string;
  characters?: Character[];
  score?: ScoreData[];
}
