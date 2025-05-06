/**
 * CHUNITHM Rating Calculation Rules
 * 
 * SSS+(1,009,000 ~ 1,010,000): 보면정수 + 2.15
 * SSS(1,007,500 ~ 1,008,999): 보면정수 + 2.00 + (100점 당 +0.01)
 * SS+(1,005,000 ~ 1,007,499): 보면정수 + 1.50 + (50점 당 +0.01)
 * SS(1,000,000 ~ 1,004,999): 보면정수 + 1.00 + (100점 당 +0.01)
 * S~S+(975,000 ~ 999,999): 보면정수 + (250점 당 +0.01)
 * AA~AAA(925,000 ~ 974,999): 보면정수 - 3.00 + (500점 당 +0.03)
 * A(900,000 ~ 924,999): 보면정수 - 5.00 + (125점 당 +0.01)
 * BBB(800,000 ~ 899,999): (보면정수 - 5.00) * 0.5 + (20,000점 당 (보면정수 - 5.00) * 0.1)
 * B~BB(600,000 ~ 799,999): (60,000점 당 (보면정수 - 5.00) * 0.1)
 * C(500,000 ~ 599,999): 0.00
 * D(0 ~ 499,999): 0.00
 */

export type RatingRank = 'SSS+' | 'SSS' | 'SS+' | 'SS' | 'S+' | 'S' | 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'C' | 'D';

/**
 * Calculate the rating for a song based on its level and score
 * @param level The chart level (보면정수)
 * @param score The player's score (0 ~ 1,010,000)
 * @returns The calculated rating value
 */
export function calculateRating(level: number, score: number): number {
  // SSS+ (1,009,000 ~ 1,010,000)
  if (score >= 1009000) {
    return level + 2.15;
  }
  
  // SSS (1,007,500 ~ 1,008,999)
  if (score >= 1007500) {
    const baseRating = level + 2.00;
    const extraPoints = score - 1007500;
    const extraRating = Math.floor(extraPoints / 100) * 0.01;
    return baseRating + extraRating;
  }
  
  // SS+ (1,005,000 ~ 1,007,499)
  if (score >= 1005000) {
    const baseRating = level + 1.50;
    const extraPoints = score - 1005000;
    const extraRating = Math.floor(extraPoints / 50) * 0.01;
    return baseRating + extraRating;
  }
  
  // SS (1,000,000 ~ 1,004,999)
  if (score >= 1000000) {
    const baseRating = level + 1.00;
    const extraPoints = score - 1000000;
    const extraRating = Math.floor(extraPoints / 100) * 0.01;
    return baseRating + extraRating;
  }
  
  // S~S+ (975,000 ~ 999,999)
  if (score >= 975000) {
    const baseRating = level;
    const extraPoints = score - 975000;
    const extraRating = Math.floor(extraPoints / 250) * 0.01;
    return baseRating + extraRating;
  }
  
  // AA~AAA (925,000 ~ 974,999)
  if (score >= 925000) {
    const baseRating = level - 3.00;
    const extraPoints = score - 925000;
    const extraRating = Math.floor(extraPoints / 500) * 0.03;
    return baseRating + extraRating;
  }
  
  // A (900,000 ~ 924,999)
  if (score >= 900000) {
    const baseRating = level - 5.00;
    const extraPoints = score - 900000;
    const extraRating = Math.floor(extraPoints / 125) * 0.01;
    return baseRating + extraRating;
  }
  
  // BBB (800,000 ~ 899,999)
  if (score >= 800000) {
    const baseValue = level - 5.00;
    const baseRating = baseValue * 0.5;
    const extraPoints = score - 800000;
    const extraRating = Math.floor(extraPoints / 20000) * (baseValue * 0.1);
    return baseRating + extraRating;
  }
  
  // B~BB (600,000 ~ 799,999)
  if (score >= 600000) {
    const baseValue = level - 5.00;
    const extraPoints = score - 600000;
    const rating = Math.floor(extraPoints / 60000) * (baseValue * 0.1);
    return Math.max(0, rating); // Ensure rating is not negative
  }
  
  // C (500,000 ~ 599,999) or D (0 ~ 499,999)
  return 0;
}

/**
 * Get the rank label based on the score
 * @param score The player's score (0 ~ 1,010,000)
 * @returns The rank as a string (SSS+, SSS, SS+, etc.)
 */
export function getRatingRank(score: number): RatingRank {
  if (score >= 1009000) return 'SSS+';
  if (score >= 1007500) return 'SSS';
  if (score >= 1005000) return 'SS+';
  if (score >= 1000000) return 'SS';
  if (score >= 990000) return 'S+';
  if (score >= 975000) return 'S';
  if (score >= 950000) return 'AAA';
  if (score >= 925000) return 'AA';
  if (score >= 900000) return 'A';
  if (score >= 800000) return 'BBB';
  if (score >= 700000) return 'BB';
  if (score >= 600000) return 'B';
  if (score >= 500000) return 'C';
  return 'D';
}

/**
 * Get the color associated with a rating rank
 * @param rank The rating rank
 * @returns A Tailwind CSS color class
 */
export function getRankColor(rank: RatingRank): string {
  if (rank.includes('SSS'))
    return 'bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white'; // 무지개 그라데이션
  if (rank.includes('SS'))
    return 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-white text-yellow-900'; // 백금 그라데이션
  if (rank.includes('S'))
    return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'; // 금 그라데이션
  if (rank.includes('A')) return 'bg-red-600 text-white'; // 빨강
  if (rank.includes('B')) return 'bg-blue-600 text-white'; // 파랑
  if (rank.includes('C')) return 'bg-yellow-800 text-yellow-100'; // 어두운 노랑
  if (rank.includes('D')) return 'bg-black text-white'; // 검정
  return 'bg-gray-500 text-white';
}
