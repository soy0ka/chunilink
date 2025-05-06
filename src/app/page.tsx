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
		<div className="dark:bg-background/70 relative min-h-screen bg-white/30">
			<div className="dark:text-foreground relative grid grid-rows-[auto_1fr_auto] items-center text-gray-800">
				<main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8">
					<h1 className="mb-4 text-4xl font-bold">안녕하세요 ChuniLink입니다.</h1>
				</main>
			</div>
		</div>
	)
}
