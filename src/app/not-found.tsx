import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: '페이지를 찾을 수 없습니다 | CHUNILINK',
	description: '요청하신 페이지를 찾을 수 없습니다.'
}

export default function NotFound() {
	return (
		<div className="relative min-h-screen overflow-hidden">
			<div className="dark:bg-background/30 dark:text-foreground relative grid min-h-screen grid-rows-[1fr] items-center bg-white/30 text-gray-800 backdrop-blur-lg">
				<main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-8 text-center">
					<div className="rounded-2xl border border-white/20 bg-white/40 p-12 shadow-xl backdrop-blur-md dark:border-gray-700/30 dark:bg-gray-900/40">
						<div className="mb-8">
							<h1 className="from-chuni-violet-500 via-chuni-mint-700 to-chuni-sky-700 bg-gradient-to-r bg-clip-text text-8xl font-bold text-transparent">
								404
							</h1>
						</div>

						<h2 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
							페이지를 찾을 수 없습니다
						</h2>

						<p className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
							요청하신 페이지는 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
						</p>

						<Link
							href="/"
							className="rounded-xl border border-white/30 bg-white/60 px-8 py-3 text-gray-800 shadow-lg backdrop-blur-sm transition duration-200 hover:bg-white/80 dark:border-gray-700/30 dark:bg-gray-800/60 dark:text-white dark:hover:bg-gray-800/80"
						>
							홈으로 돌아가기
						</Link>
					</div>
				</main>
			</div>
		</div>
	)
}
