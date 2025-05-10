'use client'

import { Menu, X } from 'lucide-react'
import { Session } from 'next-auth'
import NextLink from 'next/link'
import { useState } from 'react'
import AuthButtons from './AuthButtons'
import ThemeToggle from './ThemeToggle'

// 세션을 프로퍼티로 받도록 컴포넌트 구조 변경
export default function NavbarContent({ session }: { session: Session | null }) {
	const [isOpen, setIsOpen] = useState(false)
	const isLoggedIn = !!session?.user

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<header className="dark:bg-background/70 fixed top-0 z-20 w-full bg-white/40 p-4 shadow-md backdrop-blur-md dark:shadow-white/10">
			<nav className="flex max-w-7xl items-center justify-between">
				<NextLink href="/" className="flex items-center gap-2">
					<div className="from-chuni-mint-700 to-chuni-violet-500 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
						CHUNILINK
					</div>
				</NextLink>

				{/* 데스크톱 메뉴 */}
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
					<AuthButtons isLoggedIn={isLoggedIn} />
					<ThemeToggle />
				</div>

				{/* 모바일 햄버거 메뉴 버튼 */}
				<button
					onClick={toggleMenu}
					className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
				>
					{isOpen ? (
						<X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
					) : (
						<Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
					)}
				</button>
			</nav>

			{/* 모바일 메뉴 (드롭다운) */}
			{isOpen && (
				<div className="mt-4 rounded-lg p-4 shadow-lg backdrop-blur-sm md:hidden">
					<div className="flex flex-col space-y-4">
						<NextLink
							href="/upload"
							className="rounded px-2 py-2 text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
							onClick={() => setIsOpen(false)}
						>
							기록 연동
						</NextLink>
						<NextLink
							href="/profile/@me"
							className="rounded px-2 py-2 text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
							onClick={() => setIsOpen(false)}
						>
							프로필
						</NextLink>
						<div className="flex items-center justify-between">
							<AuthButtons isLoggedIn={isLoggedIn} />
							<ThemeToggle />
						</div>
					</div>
				</div>
			)}
		</header>
	)
}
