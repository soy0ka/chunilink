import { getServerAuthSession } from '@/library/auth'
import NextLink from 'next/link'
import AuthButtons from './AuthButtons'
import ThemeToggle from './ThemeToggle'

export default async function Nabar() {
	// 서버 컴포넌트에서 세션 상태 확인
	const session = await getServerAuthSession()
	const isLoggedIn = !!session?.user

	return (
		<header className="z-1 dark:bg-background/70 sticky top-0 w-full bg-white/40 p-4 shadow-md backdrop-blur-md dark:shadow-white/10">
			<nav className="mx-auto flex max-w-7xl items-center justify-between">
				<NextLink href="/" className="flex items-center gap-2">
					<div className="from-chuni-mint-700 to-chuni-violet-500 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
						CHUNILINK
					</div>
				</NextLink>
				<div className="flex items-center md:gap-6">
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
					<AuthButtons isLoggedIn={isLoggedIn} />
					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}
