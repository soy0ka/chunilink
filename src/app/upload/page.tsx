/* eslint-disable */
'use client'

import Bookmarklet from '@/components/shared/Bookmarklet'
import Box from '@/components/UI/Box'
import Button from '@/components/UI/Button'
import { AlertCircle, Check, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

// Interface definitions
interface StepStatus {
	playerInfo: 'pending' | 'processing' | 'complete' | 'error'
	playData: 'pending' | 'processing' | 'complete' | 'error'
	songData: 'pending' | 'processing' | 'complete' | 'error'
	ratingData: 'pending' | 'processing' | 'complete' | 'error'
	difficulties: {
		basic: 'pending' | 'processing' | 'complete' | 'error'
		advanced: 'pending' | 'processing' | 'complete' | 'error'
		expert: 'pending' | 'processing' | 'complete' | 'error'
		master: 'pending' | 'processing' | 'complete' | 'error'
		ultima: 'pending' | 'processing' | 'complete' | 'error'
	}
}

// Inner component that uses search params
function UploadPageContent() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const isBookmarklet = searchParams.get('bookmarklet') === 'true'
	const isPostUpload = searchParams.get('post') === 'true'
	const hasUploadParam = isBookmarklet || isPostUpload

	const [fileContent, setFileContent] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(hasUploadParam)
	const [progress, setProgress] = useState(hasUploadParam ? 10 : 0)
	const [success, setSuccess] = useState(false)
	const [stepStatus, setStepStatus] = useState<StepStatus>({
		playerInfo: hasUploadParam ? 'processing' : 'pending',
		playData: 'pending',
		songData: 'pending',
		ratingData: 'pending',
		difficulties: {
			basic: 'pending',
			advanced: 'pending',
			expert: 'pending',
			master: 'pending',
			ultima: 'pending'
		}
	})
	const [waitingForData, setWaitingForData] = useState(hasUploadParam)
	const [progressMessage, setProgressMessage] = useState<string>('데이터를 기다리는 중...')
	const [currentStep, setCurrentStep] = useState<number>(0)
	const [totalSteps, setTotalSteps] = useState<number>(8)
	const [currentActiveStep, setCurrentActiveStep] = useState<keyof StepStatus | null>(
		hasUploadParam ? 'playerInfo' : null
	)

	const processBookmarkletData = async (data: any) => {
		try {
			// 데이터 구조 유효성 검사
			if (!data || !data.name) {
				throw new Error('유효하지 않은 데이터 형식입니다.')
			}

			// 최종 처리 단계는 수동으로 처리
			setStepStatus((prev) => ({
				...prev,
				playerInfo: prev.playerInfo !== 'error' ? 'complete' : prev.playerInfo,
				playData: prev.playData !== 'error' ? 'complete' : prev.playData,
				songData: prev.songData !== 'error' ? 'complete' : prev.songData,
				ratingData: prev.ratingData !== 'error' ? 'complete' : prev.ratingData,
				difficulties: {
					basic: prev.difficulties.basic !== 'error' ? 'complete' : prev.difficulties.basic,
					advanced:
						prev.difficulties.advanced !== 'error' ? 'complete' : prev.difficulties.advanced,
					expert: prev.difficulties.expert !== 'error' ? 'complete' : prev.difficulties.expert,
					master: prev.difficulties.master !== 'error' ? 'complete' : prev.difficulties.master,
					ultima: prev.difficulties.ultima !== 'error' ? 'complete' : prev.difficulties.ultima
				}
			}))
			setProgress(100)
			setProgressMessage('데이터 처리가 완료되었습니다!')

			// 성공적으로 처리됨
			setSuccess(true)

			// 로컬 스토리지에 데이터 저장
			localStorage.setItem('chunithm-data', JSON.stringify(data))

			// 3초 후 프로필 페이지로 리다이렉트
			setTimeout(() => {
				router.push('/profile')
			}, 3000)
		} catch (err) {
			setError(
				`데이터 처리 중 오류가 발생했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`
			)
			console.error(err)

			// 에러 발생 시 현재 활성화된 단계만 오류로 표시
			setStepStatus((prev) => {
				if (!currentActiveStep) return prev

				const newStatus = { ...prev }
				// 현재 활성화 단계만 에러로 표시
				;(newStatus[currentActiveStep] as any) = 'error'
				return newStatus
			})
		} finally {
			setLoading(false)
		}
	}

	// 북마크렛을 통한 데이터 수신 처리
	useEffect(() => {
		if (!hasUploadParam) return

		// 함수: 데이터를 처리하는 핸들러
		const processPostData = async (jsonData: any) => {
			console.log('processPostData', jsonData)
			setWaitingForData(false)
			try {
				// 데이터가 문자열인 경우 JSON으로 파싱
				const dataToProcess = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
				setFileContent(typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData))
				await processBookmarkletData(dataToProcess)
			} catch (err) {
				setError('데이터를 처리하는 중 오류가 발생했습니다.')
				setLoading(false)
				setWaitingForData(false)
				// 현재 활성화된 단계만 에러로 표시
				if (currentActiveStep) {
					setStepStatus((prev) => {
						const newStatus = { ...prev }
						// 현재 활성화된 단계가 'difficulties' 내부의 항목인 경우 특별 처리
						if (currentActiveStep === 'songData' && newStatus.difficulties) {
							// 현재 처리 중인 난이도 찾기
							const processingDifficulty = Object.entries(newStatus.difficulties).find(
								([_, status]) => status === 'processing'
							)

							if (processingDifficulty) {
								// 해당 난이도만 에러 상태로 변경
								newStatus.difficulties[
									processingDifficulty[0] as keyof typeof newStatus.difficulties
								] = 'error'
							} else {
								// 처리 중인 난이도가 없으면 songData 자체를 에러로
								newStatus.songData = 'error'
							}
						} else {
							// 그 외 일반 단계는 직접 에러로 설정
							;(newStatus[currentActiveStep] as any) = 'error'
						}
						return newStatus
					})
				}
				console.error('데이터 처리 오류:', err)
			}
		}

		// 진행 상황 업데이트 핸들러
		const processProgressData = (progressData: any) => {
			console.log('Progress update:', progressData)

			// progressData가 비어있거나 필요한 속성이 없는 경우 기본값 사용
			if (!progressData) {
				return
			}

			// 객체에서 값을 추출하고 안전하게 기본값 설정
			const current = progressData.current || 0
			const total = progressData.total || 10 // 기본 총 단계는 10로 설정
			const message = progressData.message || '데이터 처리 중...'

			// 현재 단계가 총 단계보다 크면 현재 단계를 총 단계로 제한
			const adjustedCurrent = Math.min(current, total)
			setCurrentStep(adjustedCurrent)

			// 총 단계 수를 업데이트하되, 현재 단계보다 작지 않도록 함
			const adjustedTotal = Math.max(total, current)
			setTotalSteps(adjustedTotal)

			// 빈 메시지인 경우 기본 메시지 사용
			setProgressMessage(message)

			// 진행률을 백분율로 계산 (0-100)
			const calculatedProgress = Math.floor((adjustedCurrent / adjustedTotal) * 100)
			// 진행률이 100%를 초과하지 않도록 제한
			setProgress(Math.min(calculatedProgress, 100))

			// 현재 진행 단계에 따라 상태 업데이트
			updateStepStatusFromProgress(adjustedCurrent, message)
		}

		// 진행 상황에 따라 단계 상태 업데이트
		const updateStepStatusFromProgress = (step: number, message: string) => {
			// 메시지 내용에 따라 특정 단계 상태 업데이트
			const lowerMessage = message.toLowerCase()

			// 새로운 상태 객체 준비 (기존 상태 복사)
			setStepStatus((prevStatus) => {
				const newStatus: StepStatus = JSON.parse(JSON.stringify(prevStatus))

				// 난이도 관련 키워드
				const difficultyKeywords = {
					basic: ['basic', '베이직'],
					advanced: ['advanced', '어드밴스드'],
					expert: ['expert', '엑스퍼트'],
					master: ['master', '마스터'],
					ultima: ['ultima', '울티마']
				}

				// 이전 현재 활성화 단계 저장
				let newActiveStep = currentActiveStep

				// 1. 플레이어 정보 처리 (가장 먼저 처리되는 항목)
				if (
					(step === 1 || lowerMessage.includes('프로필') || lowerMessage.includes('플레이어')) &&
					newStatus.playerInfo !== 'complete' &&
					newStatus.playerInfo !== 'error'
				) {
					newStatus.playerInfo = 'processing'
					newActiveStep = 'playerInfo'

					// 완료 여부 확인
					if (lowerMessage.includes('완료')) {
						newStatus.playerInfo = 'complete'
					}
				}

				// 2. 난이도별 데이터 처리
				// 각 난이도별 상태 업데이트
				for (const [difficulty, keywords] of Object.entries(difficultyKeywords)) {
					if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
						// 해당 난이도가 언급되면 처리 중으로 표시
						if (
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] !== 'error'
						) {
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] =
								'processing'
						}

						// 곡 정보도 처리 중으로 표시 (상위 카테고리)
						if (newStatus.songData !== 'complete' && newStatus.songData !== 'error') {
							newStatus.songData = 'processing'
							newActiveStep = 'songData'
						}

						// "완료" 키워드가 있으면 해당 난이도 완료 표시
						if (lowerMessage.includes('완료')) {
							if (
								newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] !==
								'error'
							) {
								newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] =
									'complete'
							}

							// 모든 난이도가 완료되었는지 확인
							const allDifficultiesComplete = Object.values(newStatus.difficulties).every(
								(status) => status === 'complete' || status === 'error'
							)

							// 모든 난이도가 완료되고 베스트/신곡 처리가 시작되지 않았으면 곡 정보도 완료
							if (
								allDifficultiesComplete &&
								!lowerMessage.includes('베스트') &&
								!lowerMessage.includes('신곡')
							) {
								if (newStatus.songData !== ('error' as StepStatus['songData'])) {
									newStatus.songData = 'complete'
								}
							}
						}
					}
				}

				// 악곡 키워드가 있지만 특정 난이도가 언급되지 않은 경우 (일반적인 곡 정보 처리)
				if (
					lowerMessage.includes('악곡') &&
					!Object.values(difficultyKeywords)
						.flat()
						.some((keyword) => lowerMessage.includes(keyword))
				) {
					// 이미 곡 정보가 완료되지 않았다면 처리 중으로 표시
					if (newStatus.songData !== 'complete' && newStatus.songData !== 'error') {
						newStatus.songData = 'processing'
						newActiveStep = 'songData'
					}

					// 완료 메시지가 있으면 곡 정보 완료
					if (lowerMessage.includes('완료')) {
						if (newStatus.songData !== ('error' as StepStatus['songData'])) {
							newStatus.songData = 'complete'
						}
					}
				}

				// 3. 플레이 데이터 처리
				// 베스트/레이팅 키워드가 있으면 플레이 데이터 처리 단계로 간주
				if (
					lowerMessage.includes('베스트') ||
					(lowerMessage.includes('레이팅') && !lowerMessage.includes('신곡'))
				) {
					// 곡 정보가 처리 중이었다면 완료로 표시
					if (newStatus.songData === 'processing') {
						if (newStatus.songData !== ('error' as StepStatus['songData'])) {
							newStatus.songData = 'complete'
						}

						// 모든 난이도도 완료로 표시
						for (const difficulty in newStatus.difficulties) {
							if (
								newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] ===
								'pending'
							) {
								newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] =
									'complete'
							}
						}
					}

					// 플레이 데이터 처리 중으로 표시
					if (newStatus.playData !== 'complete' && newStatus.playData !== 'error') {
						newStatus.playData = 'processing'
						newActiveStep = 'playData'
					}

					// 베스트 데이터 처리가 완료되었다는 메시지가 있으면
					if (lowerMessage.includes('베스트') && lowerMessage.includes('완료')) {
						if (newStatus.playData !== 'error') {
							newStatus.playData = 'complete'
						}
					}
				}

				// 4. 신곡/레이팅 데이터 처리
				if (lowerMessage.includes('신곡')) {
					// 플레이 데이터가 처리 중이었다면 완료로 표시
					if (newStatus.playData === 'processing') {
						if (newStatus.playData !== ('error' as StepStatus['playData'])) {
							newStatus.playData = 'complete'
						}
					}

					// 레이팅 데이터 처리 중으로 표시
					if (newStatus.ratingData !== 'complete' && newStatus.ratingData !== 'error') {
						newStatus.ratingData = 'processing'
						newActiveStep = 'ratingData'
					}

					// 신곡 처리가 완료되었다는 메시지가 있으면
					if (lowerMessage.includes('완료')) {
						if (newStatus.ratingData !== 'error') {
							newStatus.ratingData = 'complete'
						}
					}
				}

				// 5. 최종 데이터 처리 단계
				if (lowerMessage.includes('데이터 처리 중')) {
					// 모든 이전 단계를 완료로 표시 (에러 상태는 유지)
					if (newStatus.playerInfo !== 'error') newStatus.playerInfo = 'complete'
					if (newStatus.songData !== 'error') newStatus.songData = 'complete'
					if (newStatus.playData !== 'error') newStatus.playData = 'complete'

					// 모든 난이도도 완료로 표시 (에러 상태는 유지)
					for (const difficulty in newStatus.difficulties) {
						if (
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] !== 'error'
						) {
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] = 'complete'
						}
					}

					// 마지막 단계 처리 중
					if (newStatus.ratingData !== 'error') {
						newStatus.ratingData = 'processing'
						newActiveStep = 'ratingData'
					}

					// 최종 처리 단계의 진행률이 높으면 완료로 표시
					if (step / totalSteps >= 0.9) {
						if (newStatus.ratingData !== 'error') {
							newStatus.ratingData = 'complete'
						}
					}
				}

				// 6. 최종 처리 완료
				// 처리가 완료되었다는 메시지나 진행도가 100%에 가까우면
				if (lowerMessage.includes('완료되었습니다') || step >= totalSteps) {
					// 모든 단계를 완료로 표시 (에러 상태는 유지)
					if (newStatus.playerInfo !== 'error') newStatus.playerInfo = 'complete'
					if (newStatus.songData !== 'error') newStatus.songData = 'complete'
					if (newStatus.playData !== 'error') newStatus.playData = 'complete'
					if (newStatus.ratingData !== 'error') newStatus.ratingData = 'complete'

					// 모든 난이도도 완료로 표시 (에러 상태는 유지)
					for (const difficulty in newStatus.difficulties) {
						if (
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] !== 'error'
						) {
							newStatus.difficulties[difficulty as keyof typeof newStatus.difficulties] = 'complete'
						}
					}
				}

				// 현재 활성화된 단계 업데이트
				setCurrentActiveStep(newActiveStep)

				return newStatus
			})
		}

		// 1. 로컬 스토리지에서 임시 데이터 확인
		const checkLocalStorage = () => {
			try {
				const storedData = localStorage.getItem('chunithm-data-temp')
				if (storedData) {
					console.log('로컬 스토리지에서 데이터를 찾았습니다.')
					processPostData(storedData)
					localStorage.removeItem('chunithm-data-temp')
					return true
				}
				return false
			} catch (err) {
				console.error('로컬 스토리지 접근 오류:', err)
				return false
			}
		}

		// 2. 메시지 이벤트 리스너 등록
		const messageHandler = (event: MessageEvent) => {
			if (event.data && event.data.type === 'CHUNITHM_DATA') {
				console.log('메시지 이벤트로 데이터를 수신했습니다.', event.data)
				processPostData(event.data.payload)
			} else if (event.data && event.data.type === 'CHUNITHM_PROGRESS') {
				// 진행 상황 업데이트 처리
				processProgressData(event.data.payload)
				// 데이터 처리가 진행 중임을 표시
				setWaitingForData(false)
				setLoading(true)
			}
		}
		window.addEventListener('message', messageHandler)

		// 3. 로컬 스토리지 확인
		const foundInStorage = checkLocalStorage()

		// 4. 데이터 요청 메시지 전송 (opener가 있는 경우)
		if (!foundInStorage && window.opener) {
			try {
				console.log('원본 창에 데이터 요청 메시지를 전송합니다.')
				window.opener.postMessage('REQUEST_CHUNITHM_DATA', '*')
			} catch (err) {
				console.error('데이터 요청 메시지 전송 중 오류:', err)
			}
		}

		// 5. 타임아웃 설정
		let timeout: NodeJS.Timeout | null = null
		if (!foundInStorage) {
			timeout = setTimeout(() => {
				if (waitingForData) {
					setError('데이터를 받지 못했습니다. 북마크렛을 다시 실행해 주세요.')
					setLoading(false)
					setWaitingForData(false)
					// 타임아웃 시 현재 활성화된 단계만 오류로 표시
					setStepStatus((prev) => {
						if (!currentActiveStep) return prev

						const newStatus = { ...prev }
						// 현재 활성화 단계만 에러로 표시
						;(newStatus[currentActiveStep] as any) = 'error'
						return newStatus
					})
				}
			}, 30000) // 30초 대기
		}

		return () => {
			window.removeEventListener('message', messageHandler)
			if (timeout) clearTimeout(timeout)
		}
	}, [
		hasUploadParam,
		waitingForData,
		stepStatus,
		totalSteps,
		currentActiveStep,
		processBookmarkletData
	])

	const getStatusIcon = (status: 'pending' | 'processing' | 'complete' | 'error') => {
		switch (status) {
			case 'pending':
				return (
					<div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
				)
			case 'processing':
				return (
					<div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
				)
			case 'complete':
				return <Check className="h-5 w-5 text-green-500" />
			case 'error':
				return <AlertCircle className="h-5 w-5 text-red-500" />
		}
	}

	return (
		<React.Fragment>
			<div className="dark:bg-background/70 min-h-screen bg-white/30 py-10 backdrop-blur-2xl">
				<div className="mx-auto max-w-xl px-6">
					<div className="space-y-8">
						{/* 헤더 */}
						<div className="text-center">
							<h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
								CHUNILINKER
							</h1>
							<p className="mt-2 text-gray-600 dark:text-gray-300">
								{hasUploadParam
									? 'CHUNITHM 데이터를 가져오고 있습니다...'
									: '북마크렛을 통해 CHUNITHM Net에서 데이터를 불러옵니다'}
							</p>
						</div>

						{/* 데이터 대기 메시지 */}
						{hasUploadParam && waitingForData && (
							<Box className="p-6 text-center">
								<div className="animate-pulse">
									<div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
								</div>
								<h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
									데이터를 기다리는 중...
								</h3>
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
									잠시만 기다려주세요. CHUNITHM Net에서 데이터를 가져오고 있습니다.
								</p>
							</Box>
						)}

						{/* 북마크렛 안내 - 대기 상태가 아닐 때만 표시 */}
						{!hasUploadParam && <Bookmarklet />}

						{/* 진행 상태 */}
						{loading && !waitingForData && (
							<Box className="space-y-6 p-6">
								<div className="relative h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										className="absolute left-0 top-0 h-full bg-indigo-600 transition-all duration-300"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<div className="mb-4 text-center text-gray-700 dark:text-gray-300">
									<div>{progressMessage || '데이터 처리 중...'}</div>
									<div className="mt-1 text-sm font-medium">
										진행 상황:{' '}
										<span className="font-medium">
											{currentStep}/{totalSteps} ({progress}%)
										</span>
									</div>
								</div>
								<div className="space-y-3">
									{/* 주요 처리 단계 */}
									<div className="flex items-center gap-3">
										{getStatusIcon(stepStatus.playerInfo)}
										<span
											className={`text-sm ${
												stepStatus.playerInfo === 'complete'
													? 'text-green-600 dark:text-green-400'
													: stepStatus.playerInfo === 'error'
														? 'text-red-600 dark:text-red-400'
														: 'text-gray-700 dark:text-gray-300'
											}`}
										>
											플레이어 정보 처리
										</span>
									</div>

									{/* 곡 정보 처리 - 주요 단계 */}
									<div className="flex items-center gap-3">
										{getStatusIcon(stepStatus.songData)}
										<span
											className={`text-sm ${
												stepStatus.songData === 'complete'
													? 'text-green-600 dark:text-green-400'
													: stepStatus.songData === 'error'
														? 'text-red-600 dark:text-red-400'
														: 'text-gray-700 dark:text-gray-300'
											}`}
										>
											곡 정보 처리
										</span>
									</div>

									{/* 곡 정보 처리 - 난이도별 하위 단계 */}
									{(stepStatus.songData === 'processing' ||
										Object.values(stepStatus.difficulties).some(
											(status) => status === 'processing' || status === 'error'
										)) && (
										<div className="ml-6 space-y-2">
											{/* 이제 부모가 에러여도 자식들은 보여주고, 에러여도 보여줌 */}
											<div className="flex items-center gap-3">
												{getStatusIcon(stepStatus.difficulties.basic)}
												<span
													className={`text-xs ${
														stepStatus.difficulties.basic === 'complete'
															? 'text-green-600 dark:text-green-400'
															: stepStatus.difficulties.basic === 'error'
																? 'text-red-600 dark:text-red-400'
																: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													BASIC
												</span>
											</div>
											<div className="flex items-center gap-3">
												{getStatusIcon(stepStatus.difficulties.advanced)}
												<span
													className={`text-xs ${
														stepStatus.difficulties.advanced === 'complete'
															? 'text-green-600 dark:text-green-400'
															: stepStatus.difficulties.advanced === 'error'
																? 'text-red-600 dark:text-red-400'
																: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													ADVANCED
												</span>
											</div>
											<div className="flex items-center gap-3">
												{getStatusIcon(stepStatus.difficulties.expert)}
												<span
													className={`text-xs ${
														stepStatus.difficulties.expert === 'complete'
															? 'text-green-600 dark:text-green-400'
															: stepStatus.difficulties.expert === 'error'
																? 'text-red-600 dark:text-red-400'
																: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													EXPERT
												</span>
											</div>
											<div className="flex items-center gap-3">
												{getStatusIcon(stepStatus.difficulties.master)}
												<span
													className={`text-xs ${
														stepStatus.difficulties.master === 'complete'
															? 'text-green-600 dark:text-green-400'
															: stepStatus.difficulties.master === 'error'
																? 'text-red-600 dark:text-red-400'
																: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													MASTER
												</span>
											</div>
											<div className="flex items-center gap-3">
												{getStatusIcon(stepStatus.difficulties.ultima)}
												<span
													className={`text-xs ${
														stepStatus.difficulties.ultima === 'complete'
															? 'text-green-600 dark:text-green-400'
															: stepStatus.difficulties.ultima === 'error'
																? 'text-red-600 dark:text-red-400'
																: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													ULTIMA
												</span>
											</div>
										</div>
									)}

									<div className="flex items-center gap-3">
										{getStatusIcon(stepStatus.playData)}
										<span
											className={`text-sm ${
												stepStatus.playData === 'complete'
													? 'text-green-600 dark:text-green-400'
													: stepStatus.playData === 'error'
														? 'text-red-600 dark:text-red-400'
														: 'text-gray-700 dark:text-gray-300'
											}`}
										>
											플레이 데이터 처리
										</span>
									</div>
									<div className="flex items-center gap-3">
										{getStatusIcon(stepStatus.ratingData)}
										<span
											className={`text-sm ${
												stepStatus.ratingData === 'complete'
													? 'text-green-600 dark:text-green-400'
													: stepStatus.ratingData === 'error'
														? 'text-red-600 dark:text-red-400'
														: 'text-gray-700 dark:text-gray-300'
											}`}
										>
											레이팅 데이터 처리
										</span>
									</div>
								</div>
							</Box>
						)}

						{/* 에러 메시지 */}
						{error && (
							<div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
								<AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
								<p className="text-sm text-red-700 dark:text-red-300">{error}</p>
							</div>
						)}

						{/* 에러 후 재시도 안내 */}
						{error && !hasUploadParam && (
							<div className="mt-4 text-center">
								<Link href="/bookmarklet">
									<Button className="inline-flex items-center gap-2">북마크렛 다시 설정하기</Button>
								</Link>
							</div>
						)}

						{/* 성공 메시지 */}
						{success && (
							<Box className="p-6 text-center">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
									<CheckCircle2 className="h-8 w-8 text-green-500 dark:text-green-400" />
								</div>
								<h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
									성과 데이터 수집 완료!
								</h3>
								<p className="mb-4 break-words text-gray-600 dark:text-gray-300">
									데이터 처리가 완료되었습니다. 잠시 후 프로필 페이지로 이동합니다.
								</p>
								<div className="animate-pulse">
									<div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
								</div>
							</Box>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

// Main component with Suspense boundary
export default function UploadPage() {
	return (
		<Suspense
			fallback={
				<div className="dark:bg-background/70 min-h-screen bg-white/30 py-10 backdrop-blur-2xl">
					<div className="mx-auto max-w-xl px-6 text-center">
						<h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
							CHUNILINKER
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-300">페이지를 불러오는 중...</p>
						<div className="mt-8 flex justify-center">
							<div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
						</div>
					</div>
				</div>
			}
		>
			<UploadPageContent />
		</Suspense>
	)
}
