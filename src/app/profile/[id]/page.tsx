import RatingSongs from '@/components/Profile/RatingSongs'
import UserCard from '@/components/Profile/UserCard'
import { getPlayerMetadata } from '@/server/database/player'
import { getPlayerData } from '@/server/service/playerService'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const slug = (await props.params).id
	if (slug === '%40me') {
		return {
			title: '내 프로필 | CHUNILINK',
			description: '내 프로필 페이지입니다.'
		}
	} else {
		const player = await getPlayerMetadata(slug)

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

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params
	const player = await getPlayerData(id)

	if (!player) return notFound()

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
