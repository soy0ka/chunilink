import { Prisma, RatingType } from '@prisma/client'
import {
	Award,
	Check,
	CheckCircle2,
	Link,
	Medal,
	Shield,
	Sparkles,
	Star,
	Trophy,
	X,
	Zap
} from 'lucide-react'
import Image from 'next/image'
import React, { JSX } from 'react'

// Prisma 모델에 맞게 타입 정의
type PlayerScoreWithSong = Prisma.PlayerScoreGetPayload<{
	include: {
		song: {
			select: {
				id: true
				title: true
				artist: true
				imageUrl: true
				difficulties: {
					select: {
						difficulty: true
						level: true
					}
				}
			}
		}
	}
}>

// 난이도 타입 정의
type Difficulty = 'BASIC' | 'ADVANCED' | 'EXPERT' | 'MASTER' | 'ULTIMA' | 'WORLD_END'

// RatingSongs 컴포넌트의 props 타입 정의
type RatingSongsProps = {
	songs: PlayerScoreWithSong[]
}

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
	if (value < 4) return 'bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400' // 그린
	if (value < 7) return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400' // 오렌지
	if (value < 10) return 'bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400' // 레드
	if (value < 12)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400' // 퍼플
	if (value < 13.25)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500' // 브론즈
	if (value < 14.5)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400' // 실버
	if (value < 15.25)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-300' // 골드
	if (value < 16)
		return 'bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-100' // 백금
	if (value < 17)
		return 'bg-clip-text text-transparent bg-linear-to-r/longer from-pink-600 to-purple-500'
	return 'bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 to-zinc-500'
}

const getClearTypeStyle = (clearType: string) => {
	switch (clearType) {
		case 'HARD':
		case 'BRAVE':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'ABSOLUTE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'CATASTROPHY':
			return 'bg-rainbow text-gray-700'
		case 'FAIL':
			return 'bg-gradient-to-r from-red-500 to-red-400 dark:from-red-600 dark:to-red-500 text-white'
		default:
			return 'bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-600 dark:to-emerald-500' // 기본
	}
}

const getComboTypeStyle = (comboType: string) => {
	switch (comboType) {
		case 'ALL_JUSTICE':
			return 'bg-vivid-rainbow text-gray-700'
		case 'ALL_JUSTICE_CRITICAL':
			return 'bg-rainbow text-gray-700'
		case 'FULL_COMBO':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		default:
			return 'bg-gradient-to-r from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-500'
	}
}

const getChainTypeStyle = (chainType: string) => {
	switch (chainType) {
		case 'FULL_CHAIN':
			return 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-yellow-900'
		case 'FULL_CHAIN_PLUS':
			return 'bg-vivid-rainbow text-gray-700'
		default:
			return 'bg-gradient-to-r from-purple-500 to-pink-400 dark:from-purple-600 dark:to-pink-500'
	}
}

// 스태이터스 배지 컴포넌트
type StatusBadgeType = 'clear' | 'combo' | 'chain'
type StatusBadgeProps = {
	type: StatusBadgeType
	label: string
	className?: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, className }) => {
	// 타입별 스타일 선택 로직
	let styleClass = ''

	if (type === 'clear') {
		styleClass = getClearTypeStyle(label)
	} else if (type === 'combo') {
		styleClass = getComboTypeStyle(label)
	} else if (type === 'chain') {
		styleClass = getChainTypeStyle(label)
	}

	// 라벨에 따라 다른 아이콘 선택
	const getClearIcon = (clearType: string) => {
		switch (clearType) {
			case 'HARD':
			case 'BRAVE':
				return <Medal className="h-3 w-3" />
			case 'ABSOLUTE':
				return <Trophy className="h-3 w-3" />
			case 'CATASTROPHY':
				return <Shield className="h-3 w-3" />
			case 'FAIL':
				return <X className="h-3 w-3" />
			default:
				return <Check className="h-3 w-3" />
		}
	}

	const getComboIcon = (comboType: string) => {
		switch (comboType) {
			case 'ALL_JUSTICE':
				return <Award className="h-3 w-3" />
			case 'ALL_JUSTICE_CRITICAL':
				return <Sparkles className="h-3 w-3" />
			case 'FULL_COMBO':
				return <Star className="h-3 w-3" />
			default:
				return <CheckCircle2 className="h-3 w-3" />
		}
	}

	const getChainIcon = (chainType: string) => {
		switch (chainType) {
			case 'FULL_CHAIN':
				return <Link className="h-3 w-3" />
			case 'FULL_CHAIN_PLUS':
				return <Zap className="h-3 w-3" />
			default:
				return <Link className="h-3 w-3" />
		}
	}

	let icon: JSX.Element

	if (type === 'clear') {
		icon = getClearIcon(label)
	} else if (type === 'combo') {
		icon = getComboIcon(label)
	} else {
		icon = getChainIcon(label)
	}

	return (
		<div
			className={`${styleClass} ${className} group relative flex items-center gap-1 overflow-hidden rounded px-2 py-1 text-xs font-bold shadow-sm transition-all duration-300 hover:shadow-md`}
		>
			<span className="relative z-10 flex items-center gap-1">
				{icon}
				{label.replace('ALL_JUSTICE_CRITICAL', 'AJC').replace('_PLUS', ' +').replaceAll('_', ' ')}
			</span>
			<div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
		</div>
	)
}

// 노래 카드 컴포넌트
const SongCard = ({ song, index }: { song: PlayerScoreWithSong; index: number }) => {
	const diffInfo = song.song.difficulties.find((diff) => diff.difficulty === song.difficulty)
	const difficultyColor = difficultyMap[diffInfo?.difficulty as Difficulty]

	// 플레이랭크 표시 및 색상 설정
	const displayPlayRank = song.playRank?.replace('_PLUS', '+') || ''
	const getPlayRankColor = (rank: string): string => {
		if (rank === 'SSS_PLUS') return 'bg-rainbow text-black' // 레인보우
		if (rank === 'SSS') return 'bg-vivid-rainbow text-black' // 플래티넘 레인보우
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
		<div className="flex transform flex-col overflow-hidden rounded-lg border border-white/40 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-black/5 dark:shadow-white/5">
			{/* 커버 이미지 */}
			<div className="relative w-full pt-[100%]">
				<Image
					src={`https://chunithm-net-eng.com/mobile/img/${song.song.imageUrl}`}
					alt={song.song.title}
					fill
					className="object-cover"
				/>
				<div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm font-bold text-white">
					{index + 1}
				</div>
				<div
					className={`absolute bottom-2 right-2 ${difficultyColor.color} flex min-w-[32px] flex-row items-center space-x-1 rounded px-1.5 py-1 text-xs font-bold text-white`}
				>
					<span>{diffInfo?.difficulty}</span>
					<span>{String(diffInfo?.level)}</span>
				</div>

				<div
					className={`inner absolute right-2 top-2 rounded ${getPlayRankColor(song.playRank)} inner px-1.5 py-0.5 text-xs font-bold shadow-md`}
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

			{/* 점수 및 레이팅 - 고정된 위치 */}
			<div className="flex items-end justify-between p-2 pt-0">
				<div className="flex flex-col items-start">
					<div className="font-mono text-xs text-gray-700 dark:text-gray-300">
						{song.score.toLocaleString()}
					</div>
				</div>
				<div
					className={`font-mono text-sm font-bold ${getRatingTextColor(song.rating ? (typeof song.rating === 'object' && 'toNumber' in song.rating ? song.rating.toNumber() : Number(song.rating)) : 0)}`}
				>
					{parseFloat(String(song.rating)).toFixed(2)}
				</div>
			</div>
			<hr className="mx-2 my-1 border-t border-gray-200 dark:border-gray-700" />

			{/* 향상된 상태 배지 섹션 - 높이 고정 */}
			<div className="mb-1 h-24 flex-1 p-2 pt-1">
				{song.clearType && song.clearType !== 'CLEAR' && (
					<StatusBadge type="clear" label={song.clearType} className="mt-2 flex-grow" />
				)}
				{song.comboType && (
					<StatusBadge type="combo" label={song.comboType} className="mt-2 flex-grow" />
				)}
				{song.cToCType && (
					<StatusBadge type="chain" label={song.cToCType} className="mt-2 flex-grow" />
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
