/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerAuthSession } from '@/library/auth'
import { prisma } from '@/library/prismaSingleton'
import { ChunithmData, PrismaEnumMap } from '@/types/chunithm'
import { calculateRating } from '@/utils/ratingCalculation'
import { HonorClass, RatingType } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/binary'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// 난이도 코드를 프리즈마 열거형으로 변환
function mapDifficultyToPrisma(difficulty: string): any {
	const difficultyMap: PrismaEnumMap = {
		Basic: 'BASIC',
		Advanced: 'ADVANCED',
		Expert: 'EXPERT',
		Master: 'MASTER',
		Ultima: 'ULTIMA',
		"World's End": 'WORLDS_END'
	}
	return difficultyMap[difficulty] || 'EXPERT'
}

// 클리어 타입을 프리즈마 열거형으로 변환
function mapClearTypeToPrisma(clearType: string): any {
	const clearTypeMap: PrismaEnumMap = {
		FAIL: 'FAIL',
		CLEAR: 'CLEAR',
		HARD: 'HARD',
		BRAVE: 'BRAVE',
		ABSOLUTE: 'ABSOLUTE',
		CATASTROPHY: 'CATASTROPHY'
	}
	return clearTypeMap[clearType] || 'FAIL'
}

// 콤보 타입을 프리즈마 열거형으로 변환
function mapComboTypeToPrisma(comboType: string): any | null {
	if (comboType === 'NO_COMBO') return null

	const comboTypeMap: PrismaEnumMap = {
		FULL_COMBO: 'FULL_COMBO',
		ALL_JUSTICE: 'ALL_JUSTICE',
		ALL_JUSTICE_CRITICAL: 'ALL_JUSTICE_CRITICAL'
	}
	return comboTypeMap[comboType] || null
}

// CToC 타입을 프리즈마 열거형으로 변환
function mapCToCTypeToPrisma(ctocType: string): any | null {
	if (ctocType === 'NO_SYNC') return null

	const ctocTypeMap: PrismaEnumMap = {
		FULL_CHAIN: 'FULL_CHAIN',
		FULL_CHAIN_2: 'FULL_CHAIN_PLUS'
	}
	return ctocTypeMap[ctocType] || null
}

// 플레이 랭크를 프리즈마 열거형으로 변환
function mapPlayRankToPrisma(playRank: string): any {
	const playRankMap: PrismaEnumMap = {
		D: 'D',
		C: 'C',
		B: 'B',
		BB: 'BB',
		BBB: 'BBB',
		A: 'A',
		AA: 'AA',
		AAA: 'AAA',
		S: 'S',
		'S+': 'S_PLUS',
		SS: 'SS',
		'SS+': 'SS_PLUS',
		SSS: 'SSS',
		'SSS+': 'SSS_PLUS'
	}
	return playRankMap[playRank] || 'D'
}

// 칭호 타입을 프리즈마 열거형으로 변환
function mapHonorTypeToPrisma(honorType: string): HonorClass {
	const honorTypeMap: Record<string, HonorClass> = {
		NORMAL: HonorClass.NONE,
		SILVER: HonorClass.SILVER,
		GOLD: HonorClass.GOLD,
		PLATINA: HonorClass.PLATINA,
		RAINBOW: HonorClass.RAINBOW
	}
	return honorTypeMap[honorType] || HonorClass.NONE
}

export async function POST(request: NextRequest) {
	try {
		// 인증 세션 확인
		const session = await getServerAuthSession()
		if (!session || !session.user) {
			return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
		}

		// 요청 본문에서 데이터 파싱
		const chunithmData: ChunithmData = await request.json()

		// 플레이어 기본 정보 업데이트 또는 생성
		let player = await prisma.player.findFirst({
			where: {
				userId: session.user.id
			}
		})

		// 캐릭터 등록 및 처리
		for (const characterData of chunithmData.character || []) {
			// 캐릭터 존재 여부 확인 및 생성
			let character = await prisma.character.findUnique({
				where: {
					id: characterData.id
				}
			})

			if (!character) {
				// 캐릭터가 없으면 새로 생성
				character = await prisma.character.create({
					data: {
						id: characterData.id,
						name: characterData.name,
						imageUrl: characterData.img
					}
				})
			}
		}

		// 총 플레이 횟수를 숫자로 변환
		const playCount = parseInt(chunithmData.totalPlayCount) || 0

		// 플레이어 정보 업데이트 또는 생성
		if (player) {
			player = await prisma.player.update({
				where: {
					id: player.id
				},
				data: {
					name: chunithmData.name,
					level: chunithmData.level,
					rating: chunithmData.rating,
					friendCode: chunithmData.friendCode,
					playCount: playCount,
					lastPlayed: new Date(chunithmData.lastPlayed),
					lastUpdated: new Date()
				}
			})
		} else {
			// 플레이어가 없으면 새로 생성
			const slug = generateSlug(chunithmData.name)
			player = await prisma.player.create({
				data: {
					userId: session.user.id,
					name: chunithmData.name,
					slug,
					level: chunithmData.level,
					rating: chunithmData.rating,
					friendCode: chunithmData.friendCode,
					playCount: playCount,
					lastPlayed: new Date(chunithmData.lastPlayed),
					lastUpdated: new Date(),
					region: 'ASIA' // 기본값
				}
			})
		}

		// 플레이어-캐릭터 관계 처리
		// 기존 관계 모두 제거
		await prisma.playerCharacter.deleteMany({
			where: {
				playerId: player.id
			}
		})

		// 새로운 관계 생성
		for (const characterData of chunithmData.character || []) {
			// 즐겨찾기 여부 확인
			const isFavorite =
				chunithmData.favoriteCharacter && characterData.id === chunithmData.favoriteCharacter.id

			await prisma.playerCharacter.create({
				data: {
					playerId: player.id,
					characterId: characterData.id,
					rank: characterData.rank || 0,
					isFavorite: isFavorite
				}
			})
		}

		// 칭호(Honor) 정보 처리
		// 기존 플레이어 칭호 관계 모두 제거
		await prisma.playerHonor.deleteMany({
			where: {
				playerId: player.id
			}
		})

		// 새로운 칭호 정보 추가
		if (chunithmData.honors && chunithmData.honors.length > 0) {
			// 순서를 추적하기 위한 변수
			let displayOrder = 0

			for (const honorData of chunithmData.honors) {
				// HonorClass 열거형으로 변환
				const honorClass = mapHonorTypeToPrisma(honorData.type || 'NORMAL')

				// 칭호 존재 여부 확인
				let honor = await prisma.honor.findFirst({
					where: {
						name: honorData.label,
						class: honorClass
					}
				})

				// 칭호가 없으면 새로 생성
				if (!honor) {
					honor = await prisma.honor.create({
						data: {
							name: honorData.label,
							class: honorClass
						}
					})
				}

				// 플레이어-칭호 관계 생성
				await prisma.playerHonor.create({
					data: {
						playerId: player.id,
						honorId: honor.id,
						displayOrder: displayOrder++, // 순서대로 표시
						isDisplayed: true
					}
				})
			}
		}

		// 기존 점수 데이터 조회 (삭제하지 않고 조회만 함)
		const existingScores = await prisma.playerScore.findMany({
			where: {
				playerId: player.id
			}
		})

		// 기존 점수를 songId와 difficulty를 키로 하는 맵으로 변환
		const existingScoreMap = new Map<string, any>()
		for (const score of existingScores) {
			const key = `${score.songId}-${score.difficulty}`
			existingScoreMap.set(key, score)
		}

		// 모든 곡 점수 데이터 처리
		const allScores = [
			...(chunithmData.best || []),
			...(chunithmData.new || []),
			...chunithmData.score
		]
		const processedScores = []
		const updatedScoreKeys = new Set<string>() // 업데이트된 스코어의 키 추적

		// 곡 데이터 배치 처리
		for (const scoreData of allScores) {
			try {
				// 스코어가 없거나 0이면 실제 플레이가 아니므로 무시
				if (!scoreData.score) continue

				// 곡 정보 찾기
				const song = await prisma.song.findFirst({
					where: {
						id: scoreData.idx.toString()
					}
				})

				// 곡이 없으면 무시하고 다음으로
				if (!song) continue

				const difficulty = mapDifficultyToPrisma(scoreData.difficulty || '')
				const key = `${song.id}-${difficulty}`

				// 이미 처리한 키는 te뛰기 (중복 스코어 방지)
				if (updatedScoreKeys.has(key)) continue
				updatedScoreKeys.add(key)

				// SongDifficulty에서 해당 곡의 보면정수 가져오기
				const songDifficulty = await prisma.songDifficulty.findFirst({
					where: {
						songId: song.id,
						difficulty: difficulty
					}
				})

				// 레이팅 계산 (보면정수 사용)
				const levelValue = songDifficulty?.level || 0
				const calculatedRating = calculateRating(scoreData.score, levelValue || new Decimal(0))

				// ratingType 설정: best에 있으면 OLD, new에 있으면 NEW, 아니면 NONE
				let ratingType
				if (
					chunithmData.best &&
					chunithmData.best.some(
						(s) => s.idx === scoreData.idx && s.difficulty === scoreData.difficulty
					)
				) {
					ratingType = RatingType.OLD
				} else if (
					chunithmData.new &&
					chunithmData.new.some(
						(s) => s.idx === scoreData.idx && s.difficulty === scoreData.difficulty
					)
				) {
					ratingType = RatingType.NEW
				} else {
					ratingType = RatingType.NONE
				}

				// 새 점수 데이터
				const newScoreData = {
					playerId: player.id,
					songId: song.id,
					difficulty: difficulty,
					score: scoreData.score,
					playRank: scoreData.playRank ? mapPlayRankToPrisma(scoreData.playRank) : 'D',
					clearType: scoreData.clearType ? mapClearTypeToPrisma(scoreData.clearType) : 'FAIL',
					comboType: scoreData.comboType ? mapComboTypeToPrisma(scoreData.comboType) : null,
					cToCType: scoreData.CtCType ? mapCToCTypeToPrisma(scoreData.CtCType) : null,
					rating: calculatedRating,
					ratingType: ratingType
				}

				const existingScore = existingScoreMap.get(key)

				if (!existingScore) {
					// 새로운 스코어: 고유 제약 조건 위반을 방지하기 위해 findFirst + upsert 사용
					const existingScoreCheck = await prisma.playerScore.findFirst({
						where: {
							playerId: player.id,
							songId: song.id,
							difficulty: difficulty
						}
					})

					if (existingScoreCheck) {
						// 이미 존재하면 업데이트 (점수가 높을 경우에만)
						if (existingScoreCheck.score < scoreData.score) {
							const playerScore = await prisma.playerScore.update({
								where: { id: existingScoreCheck.id },
								data: newScoreData
							})
							processedScores.push(playerScore)
						}
					} else {
						// 없으면 새로 생성
						const playerScore = await prisma.playerScore.create({
							data: newScoreData
						})
						processedScores.push(playerScore)
					}
				} else if (existingScore.score < scoreData.score) {
					// 기존보다 높은 스코어면 업데이트
					const playerScore = await prisma.playerScore.update({
						where: { id: existingScore.id },
						data: newScoreData
					})
					processedScores.push(playerScore)
				}
				// 스코어가 같거나 낮으면 무시 (변경 없음)
			} catch (error) {
				console.error(`Score processing error for song ${scoreData.idx || 'unknown'}:`, error)
				// 계속 진행
			}
		}

		return NextResponse.json({
			success: true,
			playerId: player.id,
			slug: player.slug,
			processedScores: processedScores.length,
			processedHonors: chunithmData.honors?.length || 0
		})
	} catch (error) {
		console.error('데이터 업로드 중 오류 발생:', error)
		return NextResponse.json({ error: '데이터 업로드 중 오류가 발생했습니다.' }, { status: 500 })
	}
}

// 고유한 슬러그 생성 함수
function generateSlug(name: string): string {
	const normalized = name
		.replace(/[\uFF21-\uFF3A]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)) // 전각 대문자
		.replace(/[\uFF41-\uFF5A]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)) // 전각 소문자
		.replace(/[\uFF10-\uFF19]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0))

	let baseSlug = normalized.toLowerCase().replace(/[^a-z0-9]/gi, '')

	if (!baseSlug) {
		baseSlug = 'chunithmer'
	}

	const uniqueId = randomUUID().substring(0, 8)
	return `${baseSlug}-${uniqueId}`
}
