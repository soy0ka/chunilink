/**
 * CHUNITHM 데이터 관련 타입 정의
 */

export type PrismaEnumMap = Record<string, string>

export type ChunithmCharacter = {
	id: string
	name: string
	img: string
	rank?: number
}

export type ChunithmHonor = {
	type?: 'NORMAL' | 'SILVER' | 'GOLD' | 'PLATINA' | 'RAINBOW'
	label: string
	src?: string
}

export type ChunithmScore = {
	idx: number
	title?: string
	score: number
	difficulty?: string
	level?: number | string
	playRank?: string
	clearType?: string
	comboType?: string
	CtCType?: string
}

export type ChunithmData = {
	name: string
	level: number
	rating: number
	friendCode: string
	totalPlayCount: string
	lastPlayed: string
	favoriteCharacter?: ChunithmCharacter
	character?: ChunithmCharacter[]
	honors?: ChunithmHonor[]
	best?: ChunithmScore[]
	new?: ChunithmScore[]
	score: ChunithmScore[]
}
