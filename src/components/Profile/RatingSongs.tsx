import { calculateRating, getRankColor, getRatingRank } from '@/utils/ratingCalculation'
import Image from 'next/image'
import React from 'react'

// 난이도 타입 정의
type Difficulty = 'BASIC' | 'ADVANCED' | 'EXPERT' | 'MASTER' | 'ULTIMA' | 'WORLD_END'

// JSON 데이터 구조에 맞춘 인터페이스
interface SongData {
	id: string
	title: string
	artist: string
	jacket: string // 이미지 URL
	difficulty: Difficulty // 'BASIC', 'ADVANCED', 'EXPERT', 'MASTER', 'ULTIMA', 'WORLD_END'
	level: number
	score: number
	rating: number
	date: string // ISO 형식 날짜 문자열
	isNew?: boolean
}

interface RatingSongsProps {
	songs: SongData[]
}

const difficultyMap: Record<Difficulty, { abbr: string; color: string }> = {
	BASIC: { abbr: 'BAS', color: 'bg-emerald-500' },
	ADVANCED: { abbr: 'ADV', color: 'bg-orange-500' },
	EXPERT: { abbr: 'EXP', color: 'bg-red-500' },
	MASTER: { abbr: 'MAS', color: 'bg-purple-500' },
	ULTIMA: { abbr: 'ULT', color: 'bg-pink-500' },
	WORLD_END: { abbr: 'WE', color: 'bg-blue-500' }
}

// 노래 카드 컴포넌트
const SongCard = ({ song, index }: { song: SongData; index: number }) => {
	const diffInfo = difficultyMap[song.difficulty] || { abbr: '???', color: 'bg-gray-500' }

	// Calculate rating based on level and score
	const calculatedRating = calculateRating(song.level, song.score)
	const rank = getRatingRank(song.score)
	const rankColor = getRankColor(rank)

	return (
		<div className="flex transform flex-col overflow-hidden rounded-lg border border-white/40 bg-white/30 shadow-md backdrop-blur-md transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
			{/* 커버 이미지 */}
			<div className="relative w-full pt-[100%]">
				<Image src={song.jacket} alt={song.title} fill className="object-cover" />
				{/* 순위 뱃지 */}
				<div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
					{index + 1}
				</div>
				{/* 난이도 뱃지 */}
				<div
					className={`absolute bottom-2 right-2 ${diffInfo.color} flex min-w-[32px] flex-col items-center rounded px-1.5 py-1 text-xs font-bold text-white`}
				>
					<span>{diffInfo.abbr}</span>
					<span>{song.level}</span>
				</div>
				{/* NEW 표시 */}
				{song.isNew && (
					<div className="absolute right-2 top-2 rounded bg-indigo-500 px-1.5 py-0.5 text-xs font-bold text-white">
						NEW
					</div>
				)}
			</div>

			{/* 곡 정보 */}
			<div className="p-2">
				<h3 className="truncate text-sm font-bold text-gray-800 dark:text-white" title={song.title}>
					{song.title}
				</h3>
				<p className="truncate text-xs text-gray-600 dark:text-gray-400" title={song.artist}>
					{song.artist}
				</p>
			</div>

			{/* 점수 및 레이팅 */}
			<div className="mt-auto flex items-end justify-between p-2 pt-0">
				<div className="flex flex-col items-start">
					<div className="font-mono text-xs text-gray-700 dark:text-gray-300">
						{song.score.toLocaleString()}
					</div>
					<div className={`font-mono text-xs font-bold ${rankColor}`}>{rank}</div>
				</div>
				<div className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
					{calculatedRating.toFixed(2)}
				</div>
			</div>
		</div>
	)
}

export const RatingSongs: React.FC<RatingSongsProps> = ({ songs }) => {
	// Calculate ratings for all songs based on their level and score
	const songsWithCalculatedRating = songs.map((song) => ({
		...song,
		calculatedRating: calculateRating(song.level, song.score)
	}))

	// 데이터 정렬 (계산된 레이팅 기준 내림차순)
	const sortedSongs = [...songsWithCalculatedRating].sort(
		(a, b) => b.calculatedRating - a.calculatedRating
	)

	// 신곡과 구곡 분리
	const newSongs = sortedSongs.filter((song) => song.isNew).slice(0, 20)
	const oldSongs = sortedSongs.filter((song) => !song.isNew).slice(0, 30)

	// 총 레이팅 계산 (최대 베스트 신곡 15곡, 구곡 25곡)
	const topNewSongs = newSongs.slice(0, 15)
	const topOldSongs = oldSongs.slice(0, 25)
	const allTopSongs = [...topNewSongs, ...topOldSongs]
	const totalRating =
		allTopSongs.reduce((sum, song) => sum + song.calculatedRating, 0) / allTopSongs.length

	return (
		<div className="mt-8 space-y-8">
			{/* 총 레이팅 표시 */}
			<div className="rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 text-center backdrop-blur-md dark:from-indigo-500/10 dark:to-purple-500/10">
				<div className="text-sm font-semibold text-gray-600 dark:text-gray-300">TOTAL RATING</div>
				<div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
					{totalRating.toFixed(2)}
				</div>
				<div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
					신곡 {topNewSongs.length}곡 + 구곡 {topOldSongs.length}곡 기준
				</div>
			</div>

			{/* 신곡 섹션 */}
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
