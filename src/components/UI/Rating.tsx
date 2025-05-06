'use client'
import React from 'react'

type RatingBoxProps = {
	rating: number
	animate?: boolean
}

type ColorConfig = {
	label: string
	textColor: string
	color: string
	bgGradient: string
	borderColor: string
	shadowColor: string
}

const getColorConfig = (value: number): ColorConfig => {
	if (value < 4)
		return {
			label: '그린',
			textColor: 'text-green-400',
			color: '#24F117',
			bgGradient: 'bg-gradient-to-br from-green-400/25 to-green-400/10',
			borderColor: 'border-green-400/50',
			shadowColor: 'shadow-green-400/30'
		}
	if (value < 7)
		return {
			label: '오렌지',
			textColor: 'text-amber-400',
			color: '#FAB90A',
			bgGradient: 'bg-gradient-to-br from-amber-400/25 to-amber-400/10',
			borderColor: 'border-amber-400/50',
			shadowColor: 'shadow-amber-400/30'
		}
	if (value < 10)
		return {
			label: '레드',
			textColor: 'text-red-400',
			color: '#F75166',
			bgGradient: 'bg-gradient-to-br from-red-400/25 to-red-400/10',
			borderColor: 'border-red-400/50',
			shadowColor: 'shadow-red-400/30'
		}
	if (value < 12)
		return {
			label: '퍼플',
			textColor: 'text-purple-400',
			color: '#EC56E5',
			bgGradient: 'bg-gradient-to-br from-purple-400/25 to-purple-400/10',
			borderColor: 'border-purple-400/50',
			shadowColor: 'shadow-purple-400/30'
		}
	if (value < 13.25)
		return {
			label: '브론즈',
			textColor: 'text-amber-700',
			color: '#CD7F32',
			bgGradient: 'bg-gradient-to-br from-amber-700/25 to-amber-700/10',
			borderColor: 'border-amber-700/50',
			shadowColor: 'shadow-amber-700/30'
		}
	if (value < 14.5)
		return {
			label: '실버',
			textColor: 'text-gray-300',
			color: '#C0C0C0',
			bgGradient: 'bg-gradient-to-br from-gray-300/25 to-gray-300/10',
			borderColor: 'border-gray-300/50',
			shadowColor: 'shadow-gray-300/30'
		}
	if (value < 15.25)
		return {
			label: '골드',
			textColor: 'text-yellow-400',
			color: '#FFD700',
			bgGradient: 'bg-gradient-to-br from-yellow-400/35 to-yellow-400/15',
			borderColor: 'border-yellow-400/60',
			shadowColor: 'shadow-yellow-400/40'
		}
	if (value < 16)
		return {
			label: '백금',
			textColor: 'text-gray-700',
			color: '#C4C48B',
			bgGradient: 'bg-gradient-to-br from-gray-100 to-yellow-100',
			borderColor: 'border-gray-200/60',
			shadowColor: 'shadow-gray-200/40'
		}
	if (value < 17)
		return {
			label: '무지개',
			textColor: 'text-white',
			color: 'rainbow',
			bgGradient: '',
			borderColor: '',
			shadowColor: 'shadow-white/10'
		}
	return {
		label: '무지개 (극)',
		textColor: 'text-white',
		color: 'rainbow-extreme',
		bgGradient: '',
		borderColor: '',
		shadowColor: 'shadow-white/20'
	}
}

const RatingBox: React.FC<RatingBoxProps> = ({ rating, animate = false }) => {
	const colorConfig = getColorConfig(rating)
	const isRainbow = rating >= 16
	const isExtremeRainbow = rating >= 17

	// Determine text class for styling based on rating tier
	const textClass = isRainbow
		? isExtremeRainbow
			? 'rainbow-extreme-text'
			: 'rainbow-text'
		: colorConfig.textColor

	return (
		<div className="relative">
			<div
				className={`rounded-xl ${colorConfig.borderColor} ${colorConfig.bgGradient} ${colorConfig.shadowColor} px-6 py-3 shadow-lg transition-all duration-300 ${
					animate ? 'scale-110' : 'scale-100'
				}`}
				style={{
					backdropFilter: 'blur(12px)',
					minWidth: '140px',
					textAlign: 'center',
					height: '96px', // Fixed height to ensure consistency
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<div
					className={`mb-1 text-xs font-medium uppercase tracking-widest opacity-80 ${colorConfig.textColor}`}
				>
					{colorConfig.label}
				</div>
				{isRainbow ? (
					// Rainbow text handling
					<div
						className={`text-4xl font-extrabold tracking-widest transition-all duration-300 ${textClass} ${
							animate ? 'scale-125' : 'scale-100'
						}`}
					>
						{rating.toFixed(2)}
					</div>
				) : (
					// Normal text handling
					<div
						className={`text-4xl font-extrabold tracking-widest transition-all duration-300 ${
							animate ? 'scale-125' : 'scale-100'
						}`}
						style={{ color: colorConfig.color, textShadow: '0 0 5px rgba(0,0,0,0.15)' }}
					>
						{rating.toFixed(2)}
					</div>
				)}
			</div>

			{/* Rainbow border effect */}
			{isRainbow && (
				<div
					className={`absolute -inset-1 rounded-xl ${
						isExtremeRainbow ? 'rainbow-border-extreme' : 'rainbow-border'
					}`}
					style={{
						zIndex: -1
					}}
				></div>
			)}
		</div>
	)
}

export default RatingBox
