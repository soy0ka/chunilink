import { FaDiscord, FaGithub } from 'react-icons/fa'

export default function Footer() {
	return (
		<footer className="dark:bg-background/80 w-full border-t border-gray-200 bg-white/40 py-10 backdrop-blur-lg transition-all duration-300 dark:border-white/15">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row">
				<div className="text-center md:text-left">
					<div className="from-chuni-mint-600 to-chuni-violet-500 mb-3 max-w-fit bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
						CHUNILINK
					</div>
					<p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
						본 웹사이트는 CHUNITHM의 비공식 팬 사이트로, SEGA와 직접적인 관련이 없습니다. 게임 관련
						데이터 및 콘텐츠의 저작권은{' '}
						<a
							href="https://www.sega.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-chuni-violet-500 hover:underline"
						>
							SEGA
						</a>
						와
						<a
							href="https://chunithm.sega.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-chuni-violet-500 hover:underline"
						>
							{' '}
							각 권리자
						</a>
						에게 있습니다. CHUNILINK는 비영리 서비스로 수익을 창출하지 않습니다.
					</p>
				</div>

				<div className="flex flex-col items-center gap-4 md:items-end">
					<div className="flex flex-col gap-4">
						<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
							{/* <Link
								href="/about"
								className="text-sm text-gray-600 underline-offset-4 transition-colors duration-200 hover:text-indigo-600 hover:underline dark:text-gray-300 dark:hover:text-white"
							>
								소개
							</Link>
							<Link
								href="/terms"
								className="text-sm text-gray-600 underline-offset-4 transition-colors duration-200 hover:text-indigo-600 hover:underline dark:text-gray-300 dark:hover:text-white"
							>
								이용약관
							</Link>
							<Link
								href="/privacy"
								className="text-sm text-gray-600 underline-offset-4 transition-colors duration-200 hover:text-indigo-600 hover:underline dark:text-gray-300 dark:hover:text-white"
							>
								개인정보처리방침
							</Link> */}
						</div>

						<div className="flex justify-center gap-4 md:justify-end">
							<a
								href="https://discord.gg/your-discord"
								target="_blank"
								rel="noopener noreferrer"
								className="dark:hover:text-chuni-violet-500 text-gray-500 transition-colors duration-200 hover:text-indigo-600 dark:text-gray-400"
							>
								<FaDiscord size={22} />
							</a>
							<a
								href="https://github.com/your-username/chunithm"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 transition-colors duration-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
							>
								<FaGithub size={22} />
							</a>
						</div>

						<div className="mt-2 text-center text-xs text-gray-500 md:text-right dark:text-gray-400">
							© {new Date().getFullYear()} CHUNILINK. All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
