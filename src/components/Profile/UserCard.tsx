import Avatar from '@UI/Avatar'
import FriendCode from '@UI/FriendCode'
import Honner from '@UI/Honner'
import RatingBox from '@UI/Rating'
import { Share2 } from 'lucide-react'
import React from 'react'

interface UserCardProps {
	userName: string
	rank: number
	avatarUrl: string
	rating: number
	friendCode: string
	playCount: number
	lastPlayDate: Date
	honners: {
		type: 'GOLD' | 'SILVER' | 'PLATINA' | 'RAINBOW' | 'NORMAL'
		label: string
		src?: string
	}[]
}

const UserCard: React.FC<UserCardProps> = ({
	userName,
	rank,
	avatarUrl,
	rating,
	friendCode,
	playCount,
	lastPlayDate,
	honners
}) => {
	// 국밥은 8천원으로 합시다
	const minWon = playCount * 1000
	const maxWon = playCount * 1500
	const minGukbap = Math.floor(minWon / 8000)
	const maxGukbap = Math.floor(maxWon / 8000)

	return (
		<div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/40 px-8 py-8 shadow-xl backdrop-blur-2xl md:flex-row md:items-end dark:border-white/10">
			<div className="flex flex-1 flex-col items-center gap-3 md:items-start">
				<div className="flex w-full max-w-xs flex-col gap-1 text-center">
					{honners.map((h, i) => (
						<Honner key={i} type={h.type} src={h.src}>
							{h.label}
						</Honner>
					))}
				</div>
				<Avatar rank={rank} avatarUrl={avatarUrl} />
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-bold tracking-widest text-gray-900 md:text-3xl dark:text-white">
						{userName}
					</h1>
					<Share2 className="h-4 w-4 cursor-pointer text-gray-400 transition-colors hover:text-indigo-500" />
				</div>
				<div className="mt-2 flex flex-wrap gap-4 text-sm">
					<div className="group relative flex items-center">
						<span className="font-bold text-gray-800 dark:text-gray-100">플레이 카운트</span>
						<span className="ml-1 font-mono font-medium text-indigo-700 decoration-indigo-300 decoration-dashed group-hover:underline dark:text-indigo-300">
							{playCount}
						</span>

						<div className="absolute left-0 top-full z-20 mt-2 hidden w-max max-w-xs group-hover:block">
							<div className="rounded-lg border border-white/10 bg-black/90 px-3 py-2 text-xs text-white shadow-xl">
								<div className="mb-1 font-semibold text-indigo-300">💰 환산 금액</div>
								<div className="mb-2 text-gray-200">
									약 {minWon.toLocaleString()}원 ~ {maxWon.toLocaleString()}원
								</div>
								<div className="mb-1 font-semibold text-amber-300">🍲 환산 국밥</div>
								<div className="leading-relaxed text-gray-200">
									약 {minGukbap}GUBP ~{maxGukbap}GUBP
								</div>
								<div className="absolute -top-1.5 left-4 h-3 w-3 rotate-45 transform border-l border-t border-white/10 bg-black/90"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
					<span className="font-mono font-medium text-gray-400 dark:text-gray-100">
						{lastPlayDate.toLocaleDateString('ko-KR', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
					<span className="font-mono font-medium text-gray-400 dark:text-gray-100">
						· VERSE 3주차
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 md:items-end">
				<RatingBox rating={rating} />
				<FriendCode code={friendCode} />
			</div>
		</div>
	)
}

export default UserCard
