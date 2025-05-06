import { ReactNode } from 'react'

type GlassmorphicButtonProps = {
	children: ReactNode
	primary?: boolean
	className?: string
	disabled?: boolean
	onClick?: () => void
}

const GlassmorphicButton = ({
	children,
	primary = false,
	className = '',
	disabled = false,
	onClick
}: GlassmorphicButtonProps) => {
	const baseClasses =
		'px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105 shadow-md backdrop-blur-sm'
	const primaryClasses =
		'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white hover:from-indigo-500/90 hover:to-purple-500/90 border border-white/20'
	const secondaryClasses =
		'bg-white/30 dark:bg-white/10 border border-white/50 dark:border-white/20 text-gray-700 dark:text-white hover:bg-white/40 dark:hover:bg-white/20'
	const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100'

	return (
		<button
			type="button"
			className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${disabled ? disabledClasses : ''} ${className}`}
			onClick={disabled ? undefined : onClick}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default GlassmorphicButton
