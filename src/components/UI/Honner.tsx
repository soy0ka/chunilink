'use client'
import React, { useEffect, useRef, useState } from 'react'

interface HonnerProps {
	children: React.ReactNode
	type?: keyof typeof HonnerBackground
	src?: string
}

const HonnerBackground = {
	NORMAL: 'https://chunithm-net-eng.com/mobile/images/honor_bg_normal.png',
	SILVER: 'https://chunithm-net-eng.com/mobile/images/honor_bg_silver.png',
	GOLD: 'https://chunithm-net-eng.com/mobile/images/honor_bg_gold.png',
	PLATINA: 'https://chunithm-net-eng.com/mobile/images/honor_bg_platina.png',
	RAINBOW: 'https://chunithm-net-eng.com/mobile/images/honor_bg_rainbow.png'
}

const Honner: React.FC<HonnerProps> = ({ children, type = 'GOLD', src }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLDivElement>(null)
	const [shouldScroll, setShouldScroll] = useState(false)
	const [animationDuration, setAnimationDuration] = useState(10)

	useEffect(() => {
		// Check if the text content is wider than the container
		const checkOverflow = () => {
			if (containerRef.current && textRef.current) {
				const isOverflowing = textRef.current.scrollWidth > containerRef.current.clientWidth
				setShouldScroll(isOverflowing)

				// Calculate animation duration based on text length
				if (isOverflowing) {
					const textWidth = textRef.current.scrollWidth
					const containerWidth = containerRef.current.clientWidth
					// Adjust speed: longer text should scroll a bit faster
					const calculatedDuration = (textWidth / containerWidth) * 8
					setAnimationDuration(calculatedDuration)
				}
			}
		}

		checkOverflow()

		// Add resize listener to handle window size changes
		window.addEventListener('resize', checkOverflow)
		return () => window.removeEventListener('resize', checkOverflow)
	}, [children])

	return (
		<div
			ref={containerRef}
			className="overflow-hidden rounded-md px-3 py-1 text-sm font-bold tracking-wide shadow-sm"
			style={{
				backgroundImage: `url('${src || HonnerBackground[type]}')`,
				textShadow: '0 1px 8px #fff8',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				maxWidth: '100%',
				whiteSpace: 'nowrap'
			}}
		>
			<div
				ref={textRef}
				className={shouldScroll ? 'scrolling-text' : ''}
				style={shouldScroll ? { animationDuration: `${animationDuration}s` } : {}}
			>
				{children}
				{shouldScroll && (
					<>
						<span className="spacer"> </span>
						{children}
					</>
				)}
			</div>
			<style jsx>{`
				.scrolling-text {
					display: inline-block;
					animation: scroll linear infinite;
					will-change: transform;
				}
				.spacer {
					display: inline-block;
					width: 2.5rem; /* Adjust spacing between repetitions */
				}
				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</div>
	)
}

export default Honner
