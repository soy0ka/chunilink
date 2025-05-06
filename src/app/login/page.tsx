'use client'

import Box from '@/components/UI/Box'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
	const router = useRouter()
	const { data: session, status } = useSession()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const error = searchParams.get('error')
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	useEffect(() => {
		// 이미 로그인한 경우 콜백 URL로 리다이렉션
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

	// 디스코드 로그인 처리
	const handleDiscordLogin = async () => {
		try {
			setIsLoading(true)
			await signIn('discord', {
				callbackUrl: callbackUrl,
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
					<h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">로그인</h1>
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
						</svg>
					)}
					{isLoading ? '로그인 중...' : 'Discord로 로그인'}
				</button>
			</Box>
		</div>
	)
}
