import { FileText, Footprints, ImageIcon, Music } from 'lucide-react'

type MenuItem = {
	icon: React.ReactNode
	label: string
}

const menuItems: MenuItem[] = [
	{
		icon: (
			<Music className="mb-2 h-5 w-5 text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-300 dark:group-hover:text-indigo-200" />
		),
		label: '레이팅'
	},
	{
		icon: (
			<FileText className="mb-2 h-5 w-5 text-pink-500 group-hover:text-pink-600 dark:text-pink-300 dark:group-hover:text-pink-200" />
		),
		label: '기록'
	},
	{
		icon: (
			<Footprints className="mb-2 h-5 w-5 text-amber-500 group-hover:text-amber-600 dark:text-amber-300 dark:group-hover:text-amber-200" />
		),
		label: '순회'
	},
	{
		icon: (
			<ImageIcon className="mb-2 h-5 w-5 text-emerald-500 group-hover:text-emerald-600 dark:text-emerald-300 dark:group-hover:text-emerald-200" />
		),
		label: '사진관'
	}
]

export function Menu() {
	return (
		<div className="mt-8 flex justify-center gap-4 md:gap-6">
			{menuItems.map((item) => (
				<button
					key={item.label}
					className="group flex h-24 w-24 flex-col items-center justify-center rounded-xl border border-white/50 px-5 py-3 shadow-lg backdrop-blur-lg transition-all duration-200 hover:bg-white/70 hover:shadow-xl active:scale-95 dark:border-white/20 dark:hover:bg-white/20"
				>
					{item.icon}
					<span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-white">
						{item.label}
					</span>
				</button>
			))}
		</div>
	)
}
