import { PlayRank } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'

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

export function calculateRating(score: number, level: Decimal | number): number {
	let baseRating = 0
	let additionalRating = 0
	const constant = Number(level)

	if (score >= 1009000) {
		// SSS+
		baseRating = constant + 2.15
	} else if (score >= 1007500) {
		// SSS
		baseRating = constant + 2.0
		additionalRating = 0.01 * Math.floor((score - 1007500) / 100)
	} else if (score >= 1005000) {
		// SS+
		baseRating = constant + 1.5
		additionalRating = 0.01 * Math.floor((score - 1005000) / 50)
	} else if (score >= 1000000) {
		// SS
		baseRating = constant + 1.0
		additionalRating = 0.01 * Math.floor((score - 1000000) / 100)
	} else if (score >= 975000) {
		// S/S+
		baseRating = constant + 0.0
		additionalRating = 0.01 * Math.floor((score - 975000) / 250)
	} else if (score >= 925000) {
		// AA/AAA
		baseRating = constant - 3.0
		additionalRating = 0.03 * Math.floor((score - 925000) / 500)
	} else if (score >= 900000) {
		// A
		baseRating = constant - 5.0
		additionalRating = 0.01 * Math.floor((score - 900000) / 125)
	} else if (score >= 800000) {
		// BBB
		baseRating = (constant - 5.0) * 0.5
		additionalRating = 0.1 * (constant - 5.0) * Math.floor((score - 800000) / 20000)
	} else if (score >= 600000) {
		// B/BB
		baseRating = 0.0
		additionalRating = 0.1 * (constant - 5.0) * Math.floor((score - 600000) / 60000)
	} else {
		// C/D
		baseRating = 0.0
	}

	return Math.max(0, baseRating + additionalRating)
}
