'use client'

import Box from '@/components/UI/Box'
import { Check, ClipboardCopy, ExternalLink, Info, Monitor, Smartphone } from 'lucide-react'
import { useState } from 'react'

export default function Bookmarklet() {
	const [copied, setCopied] = useState(false)
	const [activeTab, setActiveTab] = useState<'PC' | 'Mobile'>('PC')
	const bookmarkletCode = `javascript:(function(){var d=document,s=d.createElement('script');s.src='${window.location.origin}/update.js?t='+new Date().getTime();d.body.appendChild(s);})();`

	const copyToClipboard = () => {
		navigator.clipboard.writeText(bookmarkletCode).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	return (
		<Box className="p-4 md:p-6">
			<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
				북마크릿으로 데이터 가져오기
			</h2>

			<div className="mb-6 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
				<div className="flex items-start gap-2">
					<Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
					<div className="text-sm text-blue-800 dark:text-blue-300">
						<p className="font-medium">북마크릿이란?</p>
						<p>
							북마크릿은 북마크(즐겨찾기)로 저장하여 사용하는 작은 JavaScript 코드입니다. 츄니링커
							북마크릿을 사용하면 CHUNITHM Net에서 플레이 데이터를 자동으로 가져올 수 있습니다.
						</p>
					</div>
				</div>
			</div>

			<div className="mb-5 text-base text-gray-700 dark:text-gray-300">
				<p className="mb-2">다음 단계에 따라 북마크릿을 설정하고 사용하세요:</p>

				<div className="mb-4 flex border-b border-gray-200 dark:border-gray-700">
					<button
						className={`inline-flex items-center gap-1 p-3 ${
							activeTab === 'PC'
								? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
								: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
						}`}
						onClick={() => setActiveTab('PC')}
					>
						<Monitor className="h-4 w-4" /> PC 환경 사용 방법
					</button>
					<button
						className={`inline-flex items-center gap-1 p-3 ${
							activeTab === 'Mobile'
								? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
								: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
						}`}
						onClick={() => setActiveTab('Mobile')}
					>
						<Smartphone className="h-4 w-4" /> 모바일 환경 사용 방법
					</button>
				</div>

				{activeTab === 'PC' && (
					<ol className="ml-5 list-decimal space-y-4">
						<li>
							<span className="font-medium">북마크바 표시하기</span>:
							<span className="mx-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:bg-gray-800">
								Ctrl+Shift+B
							</span>
							또는
							<span className="mx-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:bg-gray-800">
								⌘+Shift+B
							</span>
							(Mac)를 눌러 북마크바를 활성화하세요.
						</li>

						<li>
							<span className="font-medium">북마크릿 코드 복사하기</span>:
							<div className="my-2">
								<div className="relative">
									<pre className="overflow-x-auto rounded-md bg-gray-50 p-3 text-xs dark:bg-gray-800">
										<code className="text-gray-800 dark:text-gray-300">{bookmarkletCode}</code>
									</pre>
									<button
										onClick={copyToClipboard}
										className="absolute right-2 top-2 rounded-md bg-white p-1 text-gray-600 shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
									>
										{copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
									</button>
								</div>
								{copied && (
									<div className="mt-1 text-xs text-green-600 dark:text-green-400">
										복사되었습니다!
									</div>
								)}
							</div>
						</li>

						<li>
							<span className="font-medium">CHUNITHM Net에 로그인하세요</span>:
							<div className="my-2">
								<a
									href="https://chunithm-net-eng.com/mobile/"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
								>
									<ExternalLink className="h-4 w-4" /> CHUNITHM-NET 접속하기
								</a>
							</div>
						</li>

						<li>
							<span className="font-medium">북마크릿 실행하기</span>: 로그인 후 홈 화면에서 방금
							추가한 &apos;츄니링커&apos; 북마크를 클릭하세요.
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								데이터를 가져오는 데에는 약 30초에서 1분 정도 소요될 수 있습니다. 데이터 수집이
								완료되면 자동으로 성과 페이지로 이동합니다.
							</p>
						</li>

						<li>
							<span className="font-medium">브라우저별 참고사항</span>:
							<ul className="ml-5 mt-2 list-disc space-y-1 text-sm">
								<li>
									<span className="font-medium">Chrome/Edge/Opera</span>: 위 방법대로 진행하면
									됩니다.
								</li>
								<li>
									<span className="font-medium">Firefox</span>: 북마크 URL에{' '}
									<code>javascript:</code> 부분이 자동으로 제거될 수 있습니다. 이 경우 직접 다시
									입력해주세요.
								</li>
								<li>
									<span className="font-medium">Safari</span>: 즐겨찾기바에서 마우스 오른쪽 버튼을
									클릭하고 &quot;새 즐겨찾기&quot;를 선택해 추가할 수도 있습니다.
								</li>
							</ul>
						</li>
					</ol>
				)}

				{activeTab === 'Mobile' && (
					<ol className="ml-5 list-decimal space-y-4">
						<li>
							<span className="font-medium">북마크릿 코드 복사하기</span>:
							<div className="my-2">
								<div className="relative">
									<pre className="overflow-x-auto rounded-md bg-gray-50 p-3 text-xs dark:bg-gray-800">
										<code className="text-gray-800 dark:text-gray-300">{bookmarkletCode}</code>
									</pre>
									<button
										onClick={copyToClipboard}
										className="absolute right-2 top-2 rounded-md bg-white p-1 text-gray-600 shadow-sm hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
									>
										{copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
									</button>
								</div>
								{copied && (
									<div className="mt-1 text-xs text-green-600 dark:text-green-400">
										복사되었습니다!
									</div>
								)}
							</div>
						</li>

						<li>
							<span className="font-medium">CHUNITHM Net에 로그인하세요</span>:
							<div className="my-2">
								<a
									href="https://chunithm-net-eng.com/mobile/"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
								>
									<ExternalLink className="h-4 w-4" /> CHUNITHM-NET 접속하기
								</a>
							</div>
						</li>

						<li>
							<span className="font-medium">북마크 추가하기</span>:
							<p className="mt-2 text-sm">Google Chrome:</p>
							<ol className="ml-5 mt-1 list-decimal text-sm">
								<li>주소창 오른쪽의 메뉴(⋮)를 탭합니다.</li>
								<li>&quot;북마크에 추가&quot;를 선택합니다.</li>
								<li>이름을 &quot;츄니링커&quot;로 입력합니다.</li>
								<li>URL을 복사한 코드로 변경합니다.</li>
								<li>&quot;저장&quot;을 탭합니다.</li>
							</ol>
						</li>

						<li>
							<span className="font-medium">북마크릿 실행하기</span>:
							<p className="mt-1 text-sm">CHUNITHM Net에 로그인한 후:</p>
							<ol className="ml-5 mt-1 list-decimal text-sm">
								<li>
									Google Chrome: 주소창 옆의 메뉴(⋮)를 탭하고 북마크에서 &quot;츄니링커&quot;를 찾아
									탭합니다.
								</li>
							</ol>
							<p className="mt-2 text-sm text-red-600 dark:text-red-400">
								참고: 일부 모바일 브라우저에서는 북마크릿이 제대로 작동하지 않을 수 있습니다. 이
								경우 PC에서 시도해보세요.
							</p>
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								데이터를 가져오는 데에는 약 30초에서 1분 정도 소요될 수 있습니다. 데이터 수집이
								완료되면 자동으로 성과 페이지로 이동합니다.
							</p>
						</li>
					</ol>
				)}
			</div>

			<div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
				<div className="flex items-start gap-2">
					<Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
					<div className="text-sm text-yellow-800 dark:text-yellow-300">
						<p className="font-medium">알려드립니다</p>
						<p>
							처음 북마크릿을 실행할 때 &quot;스크립트 실행을 허용하시겠습니까?&quot;와 같은 경고가
							표시될 수 있습니다. 이 경우 &quot;허용&quot; 또는 &quot;예&quot;를 선택해주세요.
						</p>
						<p className="mt-1">
							데이터 수집 중에 &quot;데이터를 가져오는 중...&quot; 메시지가 표시됩니다. 프로세스가
							완료될 때까지 페이지를 닫거나 이동하지 마세요.
						</p>
					</div>
				</div>
			</div>
			<div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
				<p>북마크릿은 직접 클릭으로는 작동하지 않습니다. 반드시 북마크에 등록 후 사용하세요.</p>
			</div>
		</Box>
	)
}
