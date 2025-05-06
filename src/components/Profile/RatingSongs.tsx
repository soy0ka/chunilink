import { Prisma, RatingType } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

// Prisma 모델에 맞게 타입 정의
type PlayerScoreWithSong = Prisma.PlayerScoreGetPayload<{
	include: {
		song: {
			select: {
				id: true
				title: true
				artist: true
				imageUrl: true
				level: true
				difficulties: true
			}
		}
	}
}>

interface RatingSongsProps {
	songs: PlayerScoreWithSong[]
}

// 난이도 타입 정의
type Difficulty = 'BASIC' | 'ADVANCED' | 'EXPERT' | 'MASTER' | 'ULTIMA' | 'WORLD_END'

const difficultyMap: Record<Difficulty, { abbr: string; color: string }> = {
	BASIC: {
		abbr: 'BASIC',
		color: 'bg-chunithm-basic'
	},
	ADVANCED: {
		abbr: 'ADVANCED',
		color: 'bg-chunithm-advanced'
	},
	EXPERT: {
		abbr: 'EXPERT',
		color: 'bg-chunithm-expert'
	},
	MASTER: {
		abbr: 'MASTER',
		color: 'bg-chunithm-master'
	},
	ULTIMA: {
		abbr: 'ULTIMA',
		color: 'bg-black/50'
	},
	WORLD_END: {
		abbr: "WORLD'S END",
		color: 'bg-blue-500'
	}
}

const getRatingTextColor = (value: number) => {
	if (value < 4) return 'text-green-800 dark:text-green-200'
	if (value < 7) return 'text-amber-800 dark:text-amber-200'
	if (value < 10) return 'text-red-800 dark:text-red-200'
	if (value < 12) return 'text-purple-800 dark:text-purple-200'
	if (value < 13.25) return 'text-amber-800 dark:text-amber-200'
	if (value < 14.5) return 'text-gray-800 dark:text-gray-200'
	if (value < 15.25) return 'text-amber-800 dark:text-amber-200'
	if (value < 16) return 'text-amber-700 dark:text-amber-700'
	if (value < 17) return 'text-zinc-700 dark:text-zinc-200'
	return 'text-pink-800 dark:text-pink-300'
}
// 노래 카드 컴포넌트
const SongCard = ({ song, index }: { song: PlayerScoreWithSong; index: number }) => {
	const diffInfo =
		difficultyMap[
			song.song.difficulties.find((diff) => diff.difficulty === song.difficulty)
				?.difficulty as Difficulty
		]

	// 플레이랭크 표시 및 색상 설정
	const displayPlayRank = song.playRank?.replace('_PLUS', '+') || ''
	const getPlayRankColor = (rank: string): string => {
		if (rank.includes('SSS'))
			return 'bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white'
		if (rank.includes('SS'))
			return 'bg-gradient-to-r from-yellow-100 via-yellow-200 to-white text-yellow-900' // 백금 그라데이션
		if (rank.includes('S'))
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900' // 금 그라데이션
		if (rank.includes('A')) return 'bg-red-600 text-white' // 빨강
		if (rank.includes('B')) return 'bg-blue-600 text-white' // 파랑
		if (rank.includes('C')) return 'bg-yellow-800 text-yellow-100' // 어두운 노랑
		if (rank.includes('D')) return 'bg-black text-white' // 검정
		return 'bg-gray-500 text-white'
	}

	return (
		<div
			className={`flex transform flex-col overflow-hidden rounded-lg border border-white/40 backdrop-blur-md transition-transform hover:-translate-y-1 dark:border-white/10 dark:shadow-white`}
		>
			{/* 커버 이미지 */}
			<div className="relative w-full pt-[100%]">
				<Image
					src={`
          https://chunithm-net-eng.com/mobile/img/${song.song.imageUrl}
          `}
					alt={song.song.title}
					fill
					className="object-cover"
				/>
				<div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
					{index + 1}
				</div>
				<div
					className={`absolute bottom-2 right-2 ${diffInfo.color} flex min-w-[32px] flex-col items-center rounded px-1.5 py-1 text-xs font-bold text-white`}
				>
					<span>{diffInfo.abbr}</span>
					<span>{song.song.level}</span>
				</div>

				<div
					className={`absolute right-2 top-2 rounded ${getPlayRankColor(song.playRank)} px-1.5 py-0.5 text-xs font-bold`}
				>
					{displayPlayRank}
				</div>
			</div>

			{/* 곡 정보 */}
			<div className="p-2">
				<h3
					className="truncate text-sm font-bold text-gray-800 dark:text-white"
					title={song.song.title}
				>
					{song.song.title}
				</h3>
				<p
					className="truncate text-xs text-gray-600 dark:text-gray-400"
					title={song.song.artist || ''}
				>
					{song.song.artist}
				</p>
			</div>

			{/* 점수 및 레이팅 */}
			<div className="mt-auto flex items-end justify-between p-2 pt-0">
				<div className="flex flex-col items-start">
					<div className="font-mono text-xs text-gray-700 dark:text-gray-300">
						{song.score.toLocaleString()}
					</div>
				</div>
				<div
					className={`font-mono text-sm font-bold ${getRatingTextColor(song.rating ? (typeof song.rating === 'object' && 'toNumber' in song.rating ? song.rating.toNumber() : Number(song.rating)) : 0)}`}
				>
					{String(song.rating)}
				</div>
			</div>
			<hr className="mx-2 my-1 border-t border-gray-200 dark:border-gray-700" />
			<div className="mt-1 flex gap-1">
				{/* Clear Type */}
				{song.clearType && (
					<span
						className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/60 dark:text-green-200"
						title="Clear Type"
					>
						{song.clearType.replace('_', ' ')}
					</span>
				)}
				{/* Combo Type */}
				{song.comboType && (
					<span
						className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/60 dark:text-blue-200"
						title="Combo Type"
					>
						{song.comboType.replace('_', ' ')}
					</span>
				)}
				{/* Chain Type */}
				{song.cToCType && (
					<span
						className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700 dark:bg-purple-900/60 dark:text-purple-200"
						title="Chain Type"
					>
						{song.cToCType.replace('_', ' ')}
					</span>
				)}
			</div>
		</div>
	)
}

export const RatingSongs: React.FC<RatingSongsProps> = ({ songs }) => {
	const newSongs = songs.filter((song) => song.ratingType === RatingType.NEW).slice(0, 20)
	const oldSongs = songs.filter((song) => song.ratingType === RatingType.OLD).slice(0, 30)

	return (
		<div className="mt-8 space-y-8">
			{newSongs.length > 0 && (
				<div>
					<div className="mb-4 flex items-center gap-3">
						<h2 className="text-xl font-bold text-gray-800 dark:text-white">신곡 베스트</h2>
						<div className="rounded-full bg-indigo-100 px-2 py-0.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
							{newSongs.length}곡
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
						{newSongs.map((song, index) => (
							<SongCard key={`new-${song.id}`} song={song} index={index} />
						))}
					</div>
				</div>
			)}

			{/* 구곡 섹션 */}
			{oldSongs.length > 0 && (
				<div>
					<div className="mb-4 flex items-center gap-3">
						<h2 className="text-xl font-bold text-gray-800 dark:text-white">구곡 베스트</h2>
						<div className="rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
							{oldSongs.length}곡
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
						{oldSongs.map((song, index) => (
							<SongCard key={`old-${song.id}`} song={song} index={index} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default RatingSongs
