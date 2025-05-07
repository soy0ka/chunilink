'use client'

import Box from '@/components/UI/Box'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaDiscord } from 'react-icons/fa'

export default function LoginPage() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const error = searchParams.get('error')
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useEffect(() => {
		if (status === 'authenticated' && session) {
			router.push(callbackUrl)
		}

		// 에러 메시지 처리
		if (error) {
			switch (error) {
				case 'OAuthSignin':
					setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
					break
				case 'OAuthCallback':
					setErrorMessage('서비스 제공자로부터 응답을 받지 못했습니다.')
					break
				case 'Callback':
					setErrorMessage('콜백 처리 중 오류가 발생했습니다.')
					break
				default:
					setErrorMessage('로그인 중 오류가 발생했습니다.')
			}
		}
	}, [error, session, status, router, callbackUrl])

	const handleDiscordLogin = async () => {
		try {
			setIsLoading(true)
			// NextAuth가 자체적으로 콜백 URL을 관리하도록 변경
			// callbackUrl 매개변수는 로그인 후 리디렉션할 경로를 의미
			await signIn('discord', {
				callbackUrl,
				redirect: true
			})
		} catch (error) {
			console.error('로그인 오류:', error)
			setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
			setIsLoading(false)
		}
	}

	// 로딩 중이면 로딩 UI 표시
	if (status === 'loading' || (status === 'authenticated' && session)) {
		return (
			<div className="flex min-h-screen items-center justify-center p-4">
				<div className="text-center">
					<div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
					<p className="mt-4 text-gray-600 dark:text-gray-300">로딩 중...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Box className="mx-auto w-full max-w-md p-8 dark:bg-black/40">
				<div className="text-center">
					<p className="mb-8 text-gray-600 dark:text-white">계속하려면 Discord로 로그인하세요.</p>
				</div>

				{errorMessage && (
					<div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
						<p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
					</div>
				)}

				<button
					onClick={handleDiscordLogin}
					disabled={isLoading}
					className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#5865F2] px-4 py-3 text-white hover:bg-[#4752c4] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
				>
					{isLoading ? (
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
					) : (
						<FaDiscord className="h-5 w-5" />
					)}
					{isLoading ? '로그인 중...' : 'Discord로 로그인'}
				</button>
			</Box>
		</div>
	)
}
