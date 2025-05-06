import NextLink from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Nabar() {
	return (
		<header className="z-1 dark:bg-background/70 sticky top-0 w-full bg-white/40 p-4 shadow-md backdrop-blur-md dark:shadow-white/10">
			<nav className="mx-auto flex max-w-7xl items-center justify-between">
				<NextLink href="/" className="flex items-center gap-2">
					<div className="from-chuni-mint-700 to-chuni-violet-500 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
						CHUNILINK
					</div>
				</NextLink>
				<div className="hidden items-center gap-6 md:flex">
					<NextLink
						href="/upload"
						className="text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
					>
						기록 연동
					</NextLink>
					<NextLink
						href="/profile/@me"
						className="text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
					>
						프로필
					</NextLink>
					<ThemeToggle />
				</div>

				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<button aria-label="메뉴 열기" className="p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</nav>
		</header>
	)
}
