import { Metadata } from 'next'

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
					<h1 className="mb-4 text-4xl font-bold">안녕하세요 ChuniLink입니다.</h1>
				</main>
			</div>
		</div>
	)
}
