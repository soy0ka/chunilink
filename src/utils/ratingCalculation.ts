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

import { PlayRank } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'

export type RatingRank =
	| 'SSS+'
	| 'SSS'
	| 'SS+'
	| 'SS'
	| 'S+'
	| 'S'
	| 'AAA'
	| 'AA'
	| 'A'
	| 'BBB'
	| 'BB'
	| 'B'
	| 'C'
	| 'D'

// 점수 범위에 따른 랭크 매핑
export const RANK_RANGES: { rank: PlayRank; min: number; max: number }[] = [
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
	{ rank: 'SSS_PLUS', min: 1007500, max: Number.MAX_SAFE_INTEGER }
]

/**
 * Calculate the rating for a song based on its level and score
 * @param score The player's score (0 ~ 1,010,000)
 * @param level The chart level (보면정수)
 * @returns The calculated rating value
 */
export function calculateRating(score: number, level: number | Decimal): number {
	const constant = Number(level)
	let rating = 0

	if (score >= 1009000) {
		// SSS+ (1,009,000 ~ 1,010,000)
		rating = constant + 2.15
	} else if (score >= 1007500) {
		// SSS (1,007,500 ~ 1,008,999)
		const baseRating = constant + 2.0
		const extraPoints = score - 1007500
		const extraRating = Math.floor(extraPoints / 100) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 1005000) {
		// SS+ (1,005,000 ~ 1,007,499)
		const baseRating = constant + 1.5
		const extraPoints = score - 1005000
		const extraRating = Math.floor(extraPoints / 50) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 1000000) {
		// SS (1,000,000 ~ 1,004,999)
		const baseRating = constant + 1.0
		const extraPoints = score - 1000000
		const extraRating = Math.floor(extraPoints / 100) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 975000) {
		// S~S+ (975,000 ~ 999,999)
		const baseRating = constant
		const extraPoints = score - 975000
		const extraRating = Math.floor(extraPoints / 250) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 925000) {
		// AA~AAA (925,000 ~ 974,999)
		const baseRating = constant - 3.0
		const extraPoints = score - 925000
		const extraRating = Math.floor(extraPoints / 500) * 0.03
		rating = baseRating + extraRating
	} else if (score >= 900000) {
		// A (900,000 ~ 924,999)
		const baseRating = constant - 5.0
		const extraPoints = score - 900000
		const extraRating = Math.floor(extraPoints / 125) * 0.01
		rating = baseRating + extraRating
	} else if (score >= 800000) {
		// BBB (800,000 ~ 899,999)
		const baseValue = constant - 5.0
		const baseRating = baseValue * 0.5
		const extraPoints = score - 800000
		const extraRating = Math.floor(extraPoints / 20000) * (baseValue * 0.1)
		rating = baseRating + extraRating
	} else if (score >= 600000) {
		// B~BB (600,000 ~ 799,999)
		const baseValue = constant - 5.0
		const extraPoints = score - 600000
		rating = Math.floor(extraPoints / 60000) * (baseValue * 0.1)
	}
	// C (500,000 ~ 599,999) or D (0 ~ 499,999) defaults to 0

	return Math.max(0, rating)
}

/**
 * Get the rank label based on the score
 * @param score The player's score (0 ~ 1,010,000)
 * @returns The rank as a string (SSS+, SSS, SS+, etc.)
 */
export function getRatingRank(score: number): RatingRank {
	if (score >= 1009000) return 'SSS+'
	if (score >= 1007500) return 'SSS'
	if (score >= 1005000) return 'SS+'
	if (score >= 1000000) return 'SS'
	if (score >= 990000) return 'S+'
	if (score >= 975000) return 'S'
	if (score >= 950000) return 'AAA'
	if (score >= 925000) return 'AA'
	if (score >= 900000) return 'A'
	if (score >= 800000) return 'BBB'
	if (score >= 700000) return 'BB'
	if (score >= 600000) return 'B'
	if (score >= 500000) return 'C'
	return 'D'
}

/**
 * Get the Prisma PlayRank enum value based on the score
 * @param score The player's score (0 ~ 1,010,000)
 * @returns The PlayRank enum value
 */
export function getPlayRank(score: number): PlayRank {
	const rank = RANK_RANGES.find((r) => score >= r.min && score <= r.max)
	return rank ? rank.rank : 'D'
}
