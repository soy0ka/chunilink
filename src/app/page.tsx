import GlassmorphicSection from '@/components/UI/Box'
import GlassmorphicButton from '@/components/UI/Button'
import GlassmorphicCard from '@/components/UI/Card'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'CHUNILINK',
	openGraph: {
		title: 'CHUNILINK',
		type: 'website'
	}
}

export default function Home() {
	return (
		<div className="dark:text-foreground relative text-gray-800">
			{/* 메인 콘텐츠 */}
			<main className="mx-auto w-full max-w-7xl flex-col gap-16 px-8 py-12 lg:px-4">
				{/* 히어로 섹션 */}
				<GlassmorphicSection className="mb-16 flex flex-col items-center justify-between gap-10 md:flex-row">
					<div className="flex-1">
						<h1 className="mb-6 text-5xl font-bold">
							<span className="text-chuni-gradient-primary block">CHUNITHM</span>
							<span className="text-chuni-gradient-secondary">플레이어를 위한</span>
						</h1>
						<p className="mb-8 text-xl opacity-85">
							국내 최고의 추니즘 기록 관리 및 정보 공유 플랫폼, 당신의 플레이를 더욱 즐겁게 만들어
							드립니다.
						</p>
						<div className="flex gap-4">
							<GlassmorphicButton primary>시작하기</GlassmorphicButton>
							<GlassmorphicButton>더 알아보기</GlassmorphicButton>
						</div>
					</div>
				</GlassmorphicSection>

				{/* 특징 카드 섹션 */}
				<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
					<GlassmorphicCard className="transition duration-300 hover:scale-105">
						<div className="bg-chuni-mint-400/20 dark:bg-chuni-mint-400/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg p-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="text-chuni-mint-600 h-8 w-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
								/>
							</svg>
						</div>
						<h2 className="text-chuni-gradient-primary mb-2 text-xl font-bold">기록 관리</h2>
						<p className="opacity-75">
							게임 플레이 기록을 쉽고 효율적으로 관리하고 분석하여 당신의 실력 향상을 도와줍니다.
						</p>
					</GlassmorphicCard>

					<GlassmorphicCard className="transition duration-300 hover:scale-105">
						<div className="bg-chuni-lavender-400/20 dark:bg-chuni-lavender-400/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg p-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="text-chuni-lavender-600 h-8 w-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
								/>
							</svg>
						</div>
						<h2 className="text-chuni-gradient-secondary mb-2 text-xl font-bold">곡 정보</h2>
						<p className="opacity-75">
							최신 곡부터 클래식 곡까지, 모든 추니즘 트랙의 상세 정보와 난이도, 패턴 분석을
							제공합니다.
						</p>
					</GlassmorphicCard>

					<GlassmorphicCard className="transition duration-300 hover:scale-105">
						<div className="bg-chuni-sky-400/20 dark:bg-chuni-sky-400/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg p-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="text-chuni-sky-600 h-8 w-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
								/>
							</svg>
						</div>
						<h2 className="text-chuni-gradient-accent mb-2 text-xl font-bold">레이팅 계산</h2>
						<p className="opacity-75">
							정확한 레이팅 계산기로 최적의 레이팅 향상 전략을 세우고, 당신의 목표를 효과적으로
							달성하세요.
						</p>
					</GlassmorphicCard>
				</div>

				{/* 최근 업데이트 섹션 */}
				<GlassmorphicSection className="mb-16">
					<h2 className="mb-6 text-3xl font-bold">최근 업데이트</h2>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
							<div className="mb-2 flex justify-between">
								<span className="text-chuni-mint-600 text-sm">2023.12.15</span>
								<span className="bg-chuni-green-400/20 text-chuni-green-600 rounded-full px-2 py-0.5 text-xs">
									새 기능
								</span>
							</div>
							<h3 className="mb-1 font-bold">레이팅 계산기 강화</h3>
							<p className="text-sm opacity-75">
								레이팅 계산의 정확도를 향상시키고 시각적 분석 도구를 추가했습니다.
							</p>
						</div>

						<div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
							<div className="mb-2 flex justify-between">
								<span className="text-chuni-mint-600 text-sm">2023.12.10</span>
								<span className="bg-chuni-lavender-400/20 text-chuni-lavender-600 rounded-full px-2 py-0.5 text-xs">
									업데이트
								</span>
							</div>
							<h3 className="mb-1 font-bold">NEW 곡 추가</h3>
							<p className="text-sm opacity-75">
								12월 업데이트로 추가된 15곡의 정보가 데이터베이스에 업데이트되었습니다.
							</p>
						</div>

						<div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
							<div className="mb-2 flex justify-between">
								<span className="text-chuni-mint-600 text-sm">2023.12.05</span>
								<span className="bg-chuni-sky-400/20 text-chuni-sky-600 rounded-full px-2 py-0.5 text-xs">
									개선
								</span>
							</div>
							<h3 className="mb-1 font-bold">UI 디자인 개선</h3>
							<p className="text-sm opacity-75">
								글래스모피즘 디자인을 적용하여 더욱 시각적으로 아름다운 인터페이스를 제공합니다.
							</p>
						</div>

						<div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
							<div className="mb-2 flex justify-between">
								<span className="text-chuni-mint-600 text-sm">2023.11.28</span>
								<span className="bg-chuni-purple-400/20 text-chuni-purple-600 rounded-full px-2 py-0.5 text-xs">
									버그 수정
								</span>
							</div>
							<h3 className="mb-1 font-bold">성능 최적화</h3>
							<p className="text-sm opacity-75">
								서버 응답 시간 개선 및 사용자 경험 향상을 위한 다양한 최적화가 이루어졌습니다.
							</p>
						</div>
					</div>
				</GlassmorphicSection>

				{/* CTA 섹션 */}
				<GlassmorphicSection className="text-center">
					<h2 className="mb-4 text-3xl font-bold">지금 바로 시작하세요</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg opacity-80">
						추니즘 플레이어들의 커뮤니티에 참여하고, 당신의 플레이를 한 단계 더 발전시키세요.
					</p>
					<GlassmorphicButton primary className="px-10 py-4 text-lg">
						무료로 가입하기
					</GlassmorphicButton>
				</GlassmorphicSection>
			</main>
		</div>
	)
}
