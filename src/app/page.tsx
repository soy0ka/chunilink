import Box from '@/components/UI/Box'
import Button from '@/components/UI/Button'
import Card from '@/components/UI/Card'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'CHUNITHM 성과 허브 | 리듬게임 성과 공유 플랫폼',
	description:
		'자신의 CHUNITHM 리듬게임 성과를 쉽게 업로드하고 공유하세요. 플레이어들과 스코어를 비교하고 성장을 기록할 수 있는 비공식 커뮤니티입니다.',
	keywords: ['chunithm', '리듬게임', '성과 공유', '스코어 기록', '아케이드 게임'],
	openGraph: {
		title: 'CHUNITHM 성과 허브 | 리듬게임 성과 공유 플랫폼',
		description:
			'자신의 CHUNITHM 리듬게임 성과를 쉽게 업로드하고 공유하세요. 플레이어들과 스코어를 비교하고 성장을 기록할 수 있는 비공식 커뮤니티입니다.',
		images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
		type: 'website'
	}
}

export default function Home() {
	return (
		<div className="dark:bg-background/70 relative min-h-screen bg-white/30">
			<div className="dark:text-foreground relative grid grid-rows-[auto_1fr_auto] items-center text-gray-800">
				<main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8">
					{/* 히어로 섹션 */}
					<Box className="flex w-full flex-col items-center py-20 text-center">
						<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/20 dark:to-purple-600/20"></div>
						<h1 className="from-chuni-mint-600 via-chuni-violet-600 mb-6 bg-gradient-to-r to-pink-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
							오늘의 츄니즘 성과를 자랑해봐요!
						</h1>
						<div className="my-4 flex flex-col justify-center gap-4 sm:flex-row">
							<Link href="/upload">
								<Button primary>성과 업로드하기</Button>
							</Link>
							<Link href="/scores">
								<Button>스코어보드 보기</Button>
							</Link>
						</div>
					</Box>

					{/* 특징 섹션 */}
					<section className="py-10">
						<h2 className="mb-12 text-center text-3xl font-bold text-indigo-600 dark:text-indigo-300">
							다양한 기능
						</h2>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<Card className="flex flex-col items-center text-center">
								<div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-indigo-100/70 dark:bg-indigo-500/30">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
										/>
									</svg>
								</div>
								<h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
									성과 트래킹
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									게임 성과를 자동으로 분석하고 시간에 따른 향상도를 그래프로 확인하세요.
								</p>
							</Card>

							<Card className="flex flex-col items-center text-center">
								<div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-purple-100/70 dark:bg-purple-500/30">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-8 w-8 text-purple-600 dark:text-purple-400"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
										/>
									</svg>
								</div>
								<h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
									커뮤니티 경쟁
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									리더보드에서 랭킹을 확인하고 친구들과 경쟁하며 실력을 향상시키세요.
								</p>
							</Card>

							<Card className="flex flex-col items-center text-center">
								<div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-pink-100/70 dark:bg-pink-500/30">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-8 w-8 text-pink-600 dark:text-pink-400"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
										/>
									</svg>
								</div>
								<h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
									상세 통계
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									곡별 성과와 레벨별 성공률 등 다양한 통계를 통해 자신의 강점과 약점을 파악하세요.
								</p>
							</Card>
						</div>
					</section>

					{/* 최근 기록 섹션 */}
					<section className="py-10">
						<div className="mb-8 flex items-center justify-between">
							<h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
								최근 공유된 기록
							</h2>
							<Link
								href="/scores"
								className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
							>
								모두 보기 →
							</Link>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{/* 기록 카드들 */}
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="overflow-hidden rounded-xl border border-white/50 bg-white/30 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-2xl dark:border-white/10 dark:bg-black/30"
								>
									<div className="relative h-48 bg-gradient-to-r from-indigo-500/90 to-purple-600/90">
										<div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
											MASTER 14+
										</div>
									</div>
									<div className="bg-white/30 p-5 backdrop-blur-sm dark:bg-black/30">
										<h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">
											사이렌 유니버스
										</h3>
										<div className="mb-3 flex gap-3 text-sm text-gray-600 dark:text-gray-300">
											<span>SSS+</span>
											<span>1,009,800</span>
											<span>FC</span>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-7 w-7 rounded-full bg-gray-300/70 backdrop-blur-sm dark:bg-gray-600/70"></div>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-200">
													유저#{1000 + i}
												</span>
											</div>
											<span className="text-xs text-gray-500 dark:text-gray-400">방금 전</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* CTA 섹션 */}
					<Box className="py-16 text-center">
						<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/20 dark:to-purple-600/20"></div>
						<h2 className="mb-4 text-3xl font-bold text-indigo-800 dark:text-white">
							지금 바로 시작하세요
						</h2>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
							여러분의 리듬게임 여정을 기록하고 다른 플레이어들과 함께 성장하세요. 지금 계정을
							만들고 첫 성과를 업로드해보세요!
						</p>
						<Link href="/register">
							<Button primary className="dark:bg-white/20">
								무료로 가입하기
							</Button>
						</Link>
					</Box>
				</main>
			</div>
		</div>
	)
}
