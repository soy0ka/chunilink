'use client'

import { signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

interface AuthButtonsProps {
	isLoggedIn: boolean
}

export default function AuthButtons({ isLoggedIn }: AuthButtonsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async () => {
		try {
			setIsLoading(true)
			await signIn('discord', { callbackUrl: '/' })
		} catch (error) {
			console.error('로그인 오류:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = async () => {
		try {
			setIsLoading(true)
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			console.error('로그아웃 오류:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoggedIn) {
		return (
			<button
				onClick={handleLogout}
				disabled={isLoading}
				className="cursor-pointer text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
			>
				{isLoading ? '처리 중...' : '로그아웃'}
			</button>
		)
	}

	return (
		<button
			onClick={handleLogin}
			disabled={isLoading}
			className="cursor-pointer text-gray-700 transition hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
		>
			{isLoading ? '처리 중...' : '로그인'}
		</button>
	)
}
