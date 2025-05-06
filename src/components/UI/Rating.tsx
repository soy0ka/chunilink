'use client'
import React from 'react'

type RatingBoxProps = {
	rating: number
	animate?: boolean
}

type ColorConfig = {
	label: string
	textColor: string
	cssClass: string
}

const getColorConfig = (value: number): ColorConfig => {
	if (value < 4)
		return {
			label: '그린',
			textColor: 'text-green-400',
			cssClass: 'rating-box-green'
		}
	if (value < 7)
		return {
			label: '오렌지',
			textColor: 'text-amber-400',
			cssClass: 'rating-box-orange'
		}
	if (value < 10)
		return {
			label: '레드',
			textColor: 'text-red-400',
			cssClass: 'rating-box-red'
		}
	if (value < 12)
		return {
			label: '퍼플',
			textColor: 'text-purple-400',
			cssClass: 'rating-box-purple'
		}
	if (value < 13.25)
		return {
			label: '브론즈',
			textColor: 'text-amber-700',
			cssClass: 'rating-box-bronze'
		}
	if (value < 14.5)
		return {
			label: '실버',
			textColor: 'text-gray-600',
			cssClass: 'rating-box-silver'
		}
	if (value < 15.25)
		return {
			label: '골드',
			textColor: 'text-yellow-800',
			cssClass: 'rating-box-gold'
		}
	if (value < 16)
		return {
			label: '백금',
			textColor: 'text-gray-700',
			cssClass: 'rating-box-platinum'
		}
	if (value < 17)
		return {
			label: '무지개',
			textColor: 'text-white',
			cssClass: ''
		}
	return {
		label: '무지개 (극)',
		textColor: 'text-white',
		cssClass: ''
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
				className={`rounded-xl px-6 py-3 shadow-lg transition-all duration-300 ${
					animate ? 'scale-110' : 'scale-100'
				} ${isRainbow ? '' : colorConfig.cssClass}`}
				style={{
					width: '160px',
					height: '80px',
					textAlign: 'center',
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
						style={{ textShadow: '0 0 5px rgba(0,0,0,0.15)' }}
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
