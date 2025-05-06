import React from 'react'

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

const Honner: React.FC<HonnerProps> = ({ children, type = 'GOLD', src }) => (
	<div
		className="rounded-md px-3 py-1 text-sm font-bold tracking-wide shadow-sm"
		style={{
			backgroundImage: `url('${src || HonnerBackground[type]}')`,
			textShadow: '0 1px 8px #fff8',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			maxWidth: '100%'
		}}
	>
		{children}
	</div>
)

export default Honner
