import RatingSongs from '@/components/Profile/RatingSongs'
import UserCard from '@/components/Profile/UserCard'
import { getServerAuthSession } from '@/library/auth'
import { prisma } from '@/library/prismaSingleton'
import { Prisma, RatingType } from '@prisma/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PlayerWithRelations = Prisma.PlayerGetPayload<{
	include: {
		User: {
			select: {
				name: true
				image: true
			}
		}
		PlayerScore: {
			include: {
				song: {
					select: {
						id: true
						title: true
						artist: true
						imageUrl: true
						difficulties: true
					}
				}
			}
		}
		PlayerCharacter: {
			include: {
				character: true
			}
		}
		PlayerHonor: {
			include: {
				honor: true
			}
		}
	}
}>

export async function generateMetadata(props: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const id = (await props.params).id
	if (id === '%40me') {
		return {
			title: '내 프로필 | CHUNILINK',
			description: '내 프로필 페이지입니다.'
		}
	} else {
		const player = await getPlayerData(id)

		if (!player) {
			return {
				title: '사용자를 찾을 수 없습니다 | CHUNILINK'
			}
		}

		return {
			title: `${player.name || 'Unknown'} (${player.rating}) | CHUNILINK`,
			description: `${player.name || 'Unknown'}님의 츄니즘 프로필입니다.`
		}
	}
}

// 서버에서 플레이어 데이터 가져오기
async function getPlayerData(id: string): Promise<PlayerWithRelations | null> {
	const session = await getServerAuthSession()
	try {
		if (id === '@me' || id === '%40me') {
			if (!session?.user?.id) {
				return notFound()
			}

			const player = await prisma.player.findFirst({
				where: {
					userId: session.user.id
				},
				select: {
					slug: true
				}
			})

			if (!player) {
				return notFound()
			} else {
				return await getPlayerData(player.slug)
			}
		}

		// 일반적인 경우: slug로 플레이어 찾기
		const player = await prisma.player.findUnique({
			where: {
				slug: id
			},
			include: {
				User: {
					select: {
						name: true,
						image: true
					}
				},
				PlayerScore: {
					orderBy: {
						rating: 'desc'
					},
					where: {
						OR: [{ ratingType: RatingType.NEW }, { ratingType: RatingType.OLD }]
					},
					include: {
						song: {
							include: {
								difficulties: true
							}
						}
					}
				},
				PlayerCharacter: {
					include: {
						character: true
					}
				},
				PlayerHonor: {
					include: {
						honor: true
					},
					orderBy: {
						displayOrder: 'asc'
					}
				}
			}
		})

		return player
	} catch (error) {
		console.error('Failed to fetch player data:', error)
		return null
	}
}

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params
	const player = await getPlayerData(id)

	if (!player) return notFound()

	// 최근 플레이 날짜 - player.lastPlayed 또는 lastUpdated를 사용
	const lastPlayDate = player.lastPlayed || player.lastUpdated || new Date()

	const favoriteCharacter = player.PlayerCharacter.find((pc) => pc.isFavorite)
	const avatarUrl =
		`https://chunithm-net-eng.com/mobile/img/${favoriteCharacter?.character.imageUrl}` ||
		'/default-avatar.png'

	const allowedHonorTypes = ['GOLD', 'SILVER', 'PLATINA', 'RAINBOW', 'NORMAL'] as const
	type AllowedHonorType = (typeof allowedHonorTypes)[number]

	const honners = player.PlayerHonor.map((honor) => ({
		type: honor.honor.class as string,
		label: honor.honor.name
	})).filter((honor) => allowedHonorTypes.includes(honor.type as AllowedHonorType)) as {
		type: AllowedHonorType
		label: string
	}[]

	// 기본 칭호가 없으면 기본 칭호 추가
	if (honners.length === 0) {
		honners.push({ type: 'NORMAL', label: 'NEW COMER' })
	}

	return (
		<div className="dark:bg-background/70 min-w-screen relative min-h-screen bg-white/30 py-10 backdrop-blur-2xl">
			<div className="mx-6">
				<div className="mx-auto max-w-4xl">
					<UserCard
						userName={player.name}
						rank={player.level}
						avatarUrl={avatarUrl}
						rating={Number(player.rating)}
						friendCode={player.friendCode}
						playCount={player.playCount}
						lastPlayDate={lastPlayDate}
						honners={honners}
					/>
					{/* <Menu /> */}

					{/* 레이팅 곡 목록 추가 */}
					<RatingSongs songs={player.PlayerScore} />
				</div>
			</div>
		</div>
	)
}
