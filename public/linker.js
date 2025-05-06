/**
 * CHUNITHM 성과 데이터 추출 및 업로드 스크립트
 *
 * 이 스크립트는 CHUNITHM-NET에서 플레이어 데이터, 악곡 점수, 레이팅 정보 등을
 * 수집하여 JSON 형태로 가공한 후 저장하거나 외부 도구에 전송합니다.
 */

const PlayRank = {
  0: 'D',
  1: 'C',
  2: 'B',
  3: 'BB',
  4: 'BBB',
  5: 'A',
  6: 'AA',
  7: 'AAA',
  8: 'S',
  9: 'S+',
  10: 'SS',
  11: 'SS+',
  12: 'SSS',
  13: 'SSS+',
}

// 유틸리티 함수 모음
const utils = {
	/**
	 * 특정 URL의 페이지를 가져와 DOM 객체로 변환합니다.
	 * @param {string} url - 가져올 페이지의 URL
	 * @returns {Promise<Document>} 파싱된 HTML 문서
	 */
	async fetchPageDoc(url) {
		const response = await fetch(url)
		const html = await response.text()
		return new DOMParser().parseFromString(html, 'text/html')
	},

	/**
	 * 폼 데이터와 함께 POST 요청을 보내고 결과를 DOM 객체로 변환합니다.
	 * @param {string} url - 요청을 보낼 URL
	 * @param {string} token - 인증 토큰
	 * @returns {Promise<Document>} 파싱된 HTML 문서
	 */
	async fetchMusicFormDoc(url, token) {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `genre=99&token=${token}`
		})
		const html = await response.text()
		return new DOMParser().parseFromString(html, 'text/html')
	},

	/**
	 * 난이도 번호를 문자열로 변환합니다.
	 * @param {number} n - 난이도 번호 (0-4)
	 * @returns {string} 난이도 문자열
	 */
	getDifficultyName(n) {
		const difficulties = ['Basic', 'Advanced', 'Expert', 'Master', 'Ultima']
		return difficulties[n] || 'Unknown'
	},

	/**
	 * 날짜를 ISO 8601 형식의 문자열로 변환합니다.
	 * @param {Date} date - 변환할 날짜 객체
	 * @returns {string} 타임존이 포함된 ISO 8601 문자열
	 */
	toISOStringWithTimezone(date) {
		const pad = (str) => `0${str}`.slice(-2)
		const year = date.getFullYear().toString()
		const month = pad((date.getMonth() + 1).toString())
		const day = pad(date.getDate().toString())
		const hour = pad(date.getHours().toString())
		const min = pad(date.getMinutes().toString())
		const sec = pad(date.getSeconds().toString())
		const tz = -date.getTimezoneOffset()
		const sign = tz >= 0 ? '+' : '-'
		const tzHour = pad(Math.abs(Math.floor(tz / 60)).toString())
		const tzMin = pad(Math.abs(tz % 60).toString())

		return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`
	},

	/**
	 * 칭호 배경 스타일에서 등급을 추출합니다.
	 * @param {string} styleAttribute - 인라인 스타일 속성
	 * @returns {string} 칭호 등급
	 */
	extractHonorRankFromStyle(styleAttribute) {
		if (!styleAttribute) return 'NORMAL'
		if (styleAttribute.includes('honor_bg_gold')) return 'GOLD'
		if (styleAttribute.includes('honor_bg_silver')) return 'SILVER'
		if (styleAttribute.includes('honor_bg_bronze')) return 'BRONZE'
		if (styleAttribute.includes('honor_bg_platinum')) return 'PLATINA'
		if (styleAttribute.includes('honor_bg_rainbow')) return 'RAINBOW'
		return 'NORMAL'
	},

	/**
	 * 딜레이를 생성합니다.
	 * @param {number} ms - 밀리초 단위의 대기 시간
	 * @returns {Promise<void>}
	 */
	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	},

	/**
	 * 음악 데이터를 파싱합니다.
	 * @param {Element} formElement - 음악 정보가 포함된 폼 요소
	 * @param {string} difficulty - 난이도 문자열
	 * @returns {Object} 파싱된 음악 데이터
	 */
	parseMusicData(formElement, difficulty) {
		const title = formElement.querySelector('.music_title')?.textContent?.trim() || ''
		if (!title) return null

		// 점수 파싱
		let score = 0
		const scoreElement = formElement
			.querySelector('.play_musicdata_highscore')
			?.querySelector('span')
		if (scoreElement) {
			score = Number(scoreElement.textContent.replaceAll(',', ''))
		}

    const idx = Number.parseInt(
			formElement.querySelector('input[type="hidden"][name="idx"]')?.getAttribute('value') || '0'
		)

    if (score !== 0) {
      // 클리어 정보 파싱
      let clearType = "FAIL"
      let comboType = "NO_COMBO"
      let CtCType = "NO_SYNC"
      let playRank = "D"
      const lampImgsDiv = formElement.querySelector('.play_musicdata_icon')
      if (lampImgsDiv) {
        const lampImgs = lampImgsDiv.querySelectorAll('img')
        for (const img of lampImgs) {
          const src = img.src
          if (src.includes('icon_clear.png')) {
            clearType = "CLEAR"
          } else if (src.includes('icon_hard.png')) {
            clearType = "HARD"
          }else if (src.includes('icon_brave.png')) {
            clearType = "BRAVE"
          } else if (src.includes('icon_absolute.png')) {
            clearType = "ABSOLUTE"
          } else if (src.includes('icon_rank_catastrophy')) {
            clearType = "CATASTROPHY"
          }

          if (src.includes('icon_fullcombo.png')) {
            comboType = "FULL_COMBO"
          } else if (src.includes('icon_alljustice.png')) {
            comboType = "ALL_JUSTICE"
          } else if (src.includes('icon_alljusticecritical.png')) {
            comboType = "ALL_JUSTICE_CRITICAL"
          }

          if (src.includes('icon_fullchain.png')) {
            CtCType = "FULL_CHAIN"
          } else if (src.includes('icon_fullchain2.png')) {
            CtCType = "FULL_CHAIN_2"
          }

          // 랭크 이미지에서 점수 추출
          const match = src.match(/icon_rank_([0-9]+)\.png/)
          if (match) {
            const rankValue = Number(match[1])
            playRank = PlayRank[rankValue] || 'D'
          }
        }
      }
      return {
        title,
        difficulty,
        score,
        playRank,
        clearType,
        comboType,
        CtCType,
        idx
      }
    } else {
      return {
        title,
        difficulty,
        score,
        playRank: null,
        clearType: null,
        comboType: null,
        CtCType: null,
        idx
      }
    }
	}
}

/**
 * 메인 실행 함수
 */
async function main() {
	// 설정 변수
	const CHUNILINK_URL = 'https://chuni.yoru.icu'
	const VERSION = '1.0.0'
	const difficulties = ['Basic', 'Advanced', 'Expert', 'Master', 'Ultima']
	const isInternational = location.hostname === 'chunithm-net-eng.com'

	// URL 구성
	const baseUrl = isInternational
		? 'https://chunithm-net-eng.com/'
		: 'https://new.chunithm-net.com/chuni-mobile/html/' + '/mobile/'
	const urls = {
		home: `${baseUrl}home/`,
		music: `${baseUrl}record/musicGenre/`,
    basic: `${baseUrl}home/playerData/`,
    character: `${baseUrl}/collection/characterList/`,
		ratingsBest: `${baseUrl}home/playerData/ratingDetailBest/`,
		ratingsNew: `${baseUrl}home/playerData/ratingDetailRecent/`
	}

	if (!isInternational) {
		alert('츄니링커는 현재 국제판 츄니즘넷 에서만 지원됩니다')
		return
	}

	let uploadWindow = window.open(CHUNILINK_URL + '/upload?bookmarklet=true', '_blank')

	// 홈 페이지에서 로그인 상태 확인
	const homeDoc = await utils.fetchPageDoc(urls.home)
	if (homeDoc.querySelector('.player_honor_block') === null) {
		alert('로그인 상태가 아닙니다. 로그인 후 다시 시도하세요.')
		return
	}

	// 진행 상태 표시 설정
	const fullProgressCount = 10
	let progressCount = 1
	
	// 츄니링커에 진행 상태 업데이트 메시지 전송
	function updateProgressToLinker(current, total, message) {
		if (uploadWindow && !uploadWindow.closed) {
			uploadWindow.postMessage(
				{
					type: 'CHUNITHM_PROGRESS',
					payload: {
						current,
						total,
						message
					}
				},
				CHUNILINK_URL
			)
			console.log(`진행 상황 업데이트: ${current}/${total} - ${message}`)
		}
	}

	// 1. 플레이어 데이터 수집
	updateProgressToLinker(progressCount, fullProgressCount, '플레이어 프로필을 가져오는 중...')
	await utils.sleep(1000)
	const playerData = await collectPlayerData(homeDoc)
  updateProgressToLinker(progressCount, fullProgressCount, '플레이어 프로필 수집 완료')

  // 1-2. 플레이어 데이터 수집
  progressCount++
  const PlayerDataDoc = await utils.fetchPageDoc(urls.basic)
  updateProgressToLinker(progressCount, fullProgressCount, '플레이어 데이터를 가져오는 중...')
  const additionalPlayerData = await collectAdditionalPlayerData(PlayerDataDoc)
  playerData.friendCode = additionalPlayerData.friendCode
  playerData.totalPlayCount = additionalPlayerData.totalPlayCount
  updateProgressToLinker(progressCount, fullProgressCount, '플레이어 데이터 수집 완료')

  // 1-3. 캐릭터 데이터 수집
  progressCount++
  const characterDataDoc = await utils.fetchPageDoc(urls.character)
  updateProgressToLinker(progressCount, fullProgressCount, '캐릭터 데이터를 가져오는 중...')
  const characterData = await collectCharacterData(characterDataDoc)
  playerData.character = characterData
  updateProgressToLinker(progressCount, fullProgressCount, '캐릭터 데이터 수집 완료')

  const favoriteCharacter = homeDoc.querySelector('.player_chara')
  const favoriteCharacterImgSrc = favoriteCharacter.querySelector('img')?.src

  // 	https://chunithm-net-eng.com/mobile/img/d39707c2e00671e7.png -> d39707c2e00671e7.png 만 추출해서 
  // characterData 배열에서 img 속성과 비교하여 해당 캐릭터를 찾음

  const favoriteCharacterData = characterData.find((character) => {
    const characterImgSrc = character.img
    return favoriteCharacterImgSrc.includes(characterImgSrc)
  }
  )
  playerData.favoriteCharacter = favoriteCharacterData
  updateProgressToLinker(progressCount, fullProgressCount, '캐릭터 데이터 수집 완료')

	// 2. 악곡 데이터 수집 준비
	progressCount++
	updateProgressToLinker(progressCount, fullProgressCount, '악곡 데이터 가져오기 준비 중...')

	const preDoc = await utils.fetchPageDoc(urls.music)
	const token = preDoc.querySelector('input[name=token]').value
	
	// 악곡 데이터 수집
	const musicData = await collectMusicData(
		urls.music,
		token,
		difficulties,
		progressCount,
		fullProgressCount,
		updateProgressToLinker
	)

	// 진행도 update (난이도 수만큼 증가)
	progressCount += difficulties.length
	
	// 3. 베스트 악곡 데이터 수집
	updateProgressToLinker(progressCount, fullProgressCount, '베스트 악곡을 가져오는 중...')
	const bestMusicData = await collectRatingMusicData(urls.ratingsBest, musicData, updateProgressToLinker)
	await utils.sleep(1000)

	// 4. 신곡 악곡 데이터 수집
	progressCount++
	updateProgressToLinker(progressCount, fullProgressCount, '신곡 악곡을 가져오는 중...')
	const newMusicData = await collectRatingMusicData(urls.ratingsNew, musicData, updateProgressToLinker)
	await utils.sleep(1000)

	// 5. 데이터 결합 및 완료
	progressCount++
	updateProgressToLinker(progressCount, fullProgressCount, '데이터 처리 중...')
	
	// 데이터 조합
	playerData.best = bestMusicData.filter(score => score.score > 0)
	playerData.new = newMusicData.filter(score => score.score > 0)
	playerData.score = musicData.filter(score => score.score > 0)

	// 필터링 결과 로깅
	const totalScores = bestMusicData.length + newMusicData.length + musicData.length
	const filteredScores = playerData.best.length + playerData.new.length + playerData.score.length
	const removedScores = totalScores - filteredScores
	console.log(`점수가 0인 ${removedScores}개의 곡 데이터가 제외되었습니다. 총 ${filteredScores}곡 전송`)
	
	// 진행 상태 메시지 업데이트
	updateProgressToLinker(progressCount, fullProgressCount, 
		`데이터 처리 완료 (${filteredScores}곡, ${removedScores}개 제외)`)

	// 완료 메시지 전송
	updateProgressToLinker(fullProgressCount, fullProgressCount, '데이터 추출이 완료되었습니다!')

	// 현재 시간 가져오기
	// const now = new Date()
	// const timestamp = Math.floor(now.getTime() / 1000)

	// 로컬 스토리지 백업 메커니즘
	try {
		localStorage.setItem('chunithm-data-temp', JSON.stringify(playerData))
		console.log('로컬 스토리지에 임시 데이터 저장됨')
	} catch (err) {
		console.error('로컬 스토리지 저장 중 오류:', err)
	}

	// 최종 데이터 전송
	try {
		if (uploadWindow && !uploadWindow.closed) {
			uploadWindow.postMessage(
				{
					type: 'CHUNITHM_DATA',
					payload: playerData
				},
				CHUNILINK_URL
			)
			console.log('데이터를 업로드 창으로 전송했습니다.')
		}
	} catch (err) {
		console.error('데이터 전송 중 오류:', err)
	}

  /**
   * 부가적 플레이어 데이터를 수집합니다.
   * 친구 코드와 총 플레이수를 수집합니다.
   * @param {Document} PlayerDataDoc - 플레이어 데이터 문서
   * @returns {Object} 부가적 플레이어 데이터
   */
  async function collectAdditionalPlayerData(PlayerDataDoc) {
    // 친구 코드는 숨겨진 span에 있음
    const friendCodeSpan = PlayerDataDoc.querySelector('.user_data_friend_tap span[style*="display:none"]')
    const friendCode = friendCodeSpan ? friendCodeSpan.textContent.trim() : ''
    const totalPlayCount = PlayerDataDoc.querySelector('.user_data_play_count')?.textContent?.trim() || ''
    
    return {
      friendCode,
      totalPlayCount
    }
  }

	/**
	 * 플레이어 프로필 데이터를 수집합니다.
	 * @param {Document} homeDoc - 홈페이지 문서
	 * @returns {Object} 플레이어 데이터
	 */
	async function collectPlayerData(homeDoc) {
		// 칭호 정보 추출
		const honors = homeDoc.querySelectorAll('.player_honor_text')
		const honorRanks = homeDoc.querySelectorAll('.player_honor_short')
		const honorsData = []

		for (let i = 0; i < honors.length && i < honorRanks.length; i++) {
			const honorText = honors[i]?.textContent?.trim() || ''
			if (!honorText) continue

			const honorRank = honorRanks[i]
			const honorRankType = utils.extractHonorRankFromStyle(honorRank?.getAttribute('style'))

			honorsData.push({ type: honorRankType, label: honorText })
		}

		// 이름, 레이팅, 레벨 추출
		const name = homeDoc.querySelector('.player_name_in').textContent

		// 레이팅 이미지에서 숫자 추출
		const ratingBlockImgs = homeDoc.querySelectorAll('.player_rating_num_block img')
		const ratingStr = []
		for (const img of ratingBlockImgs) {
			const src = img.src
			if (src.includes('comma')) {
				ratingStr.push('.')
				continue
			}
			const match = src.match(/([0-9])\.png/)
			if (match) ratingStr.push(match[1])
		}
		const rating = Number(ratingStr.join(''))

		// 레벨 추출
		let playerLevel = Number(homeDoc.querySelector('.player_lv').innerText)
		const playerReborn = homeDoc.querySelector('.player_reborn')
		if (playerReborn !== null) {
			playerLevel += Number(playerReborn.innerText) * 100
		}

		// 마지막 플레이 시간 추출
		const lastPlayed = homeDoc.querySelector('.player_lastplaydate_text').textContent // yyyy/MM/DD hh:mm 형식

		return {
			appVersion: VERSION,
			honors: honorsData,
			name: name,
			rating: rating,
			level: playerLevel,
			updatedAt: utils.toISOStringWithTimezone(new Date()),
			lastPlayed: utils.toISOStringWithTimezone(new Date(lastPlayed))
		}
	}

  async function collectCharacterData(characterDoc) {
    const characterData = []

    const characterList = characterDoc.querySelector('#list')

    for (const character of characterList.children) {
      if (!character.classList.contains('box01')) continue

      // 캐릭터 ID
      const characterId = character.querySelector('input[name="chara"]')?.value || ''

      // 캐릭터 이름
      const characterName = character.querySelector('.character_name_block a')?.textContent?.trim() || ''

      // 캐릭터 이미지
      const imgElem = character.querySelector('.list_chara_img img')
      const characterImg = imgElem?.getAttribute('data-original') || imgElem?.src || ''
      const bgImage = character.querySelector('.list_chara_img')?.getAttribute('style')
      const background = bgImage ? bgImage.replace(/.*url\(([^)]+)\).*/, '$1') : ''

      // 캐릭터 레벨 (숫자 이미지 여러 개로 구성)
      let characterLevel = ''
      const levelImgs = character.querySelectorAll('.character_list_rank_num img')
      for (const img of levelImgs) {
        const match = img.src.match(/num_s_lv_([0-9]+)\.png/)
        if (match) characterLevel += match[1]
      }
      characterLevel = characterLevel ? Number(characterLevel) : null

      let imgFilename = ''
      if (characterImg) {
        const match = characterImg.match(/\/([^\/?#]+\.png)(?:[?#]|$)/)
        imgFilename = match ? match[1] : characterImg
      }

      characterData.push({
        id: characterId,
        name: characterName,
        img: imgFilename,
        rank: characterLevel,
        background
      })
    }
    return characterData
  }

	/**
	 * 악곡 데이터를 수집합니다.
	 * @param {string} musicUrl - 음악 정보 기본 URL
	 * @param {string} token - 인증 토큰
	 * @param {string[]} difficulties - 난이도 목록
	 * @param {number} startProgress - 시작 진행 단계
	 * @param {number} totalProgress - 전체 진행 단계
	 * @param {Function} progressCallback - 진행상황 업데이트 콜백
	 * @returns {Array} 수집된 악곡 데이터
	 */
	async function collectMusicData(
		musicUrl,
		token,
		difficulties,
		startProgress,
		totalProgress,
		progressCallback
	) {
		const musicData = []
		let currentProgress = startProgress

		// 전체 진행 과정 시작 알림
		progressCallback(currentProgress, totalProgress, '악곡 데이터 수집 시작...');

		for (let i = 0; i < difficulties.length; i++) {
			const difficulty = difficulties[i]
			currentProgress++

			// 각 난이도별 진행 상황 알림
			progressCallback(
				currentProgress,
				totalProgress, 
				`${difficulty.toUpperCase()} 데이터를 가져오는 중...`
			)

			const sendUrl = `${musicUrl}send${difficulty}`
			const musicDoc = await utils.fetchMusicFormDoc(sendUrl, token)

			// 곡 수 계산
			const forms = musicDoc.querySelectorAll('form')
			const songCount = forms.length;
			let processedCount = 0;

			// 데이터 파싱 시작 알림
			progressCallback(
				currentProgress, 
				totalProgress,
				`${difficulty.toUpperCase()} 곡 정보 분석 중... (0/${songCount})`
			);

			for (const form of forms) {
				if (!form.querySelector('.music_title')) continue

				const musicInfo = utils.parseMusicData(form, difficulty)
				if (musicInfo) {
					musicData.push(musicInfo)
				}
				
				// 20곡마다 진행 상황 업데이트
				processedCount++;
				if (processedCount % 20 === 0 || processedCount === songCount) {
					progressCallback(
						currentProgress,
						totalProgress,
						`${difficulty.toUpperCase()} 곡 정보 분석 중... (${processedCount}/${songCount})`
					);
				}
			}

			// 현재 난이도 완료 알림
			progressCallback(
				currentProgress,
				totalProgress,
				`${difficulty.toUpperCase()} 데이터 수집 완료 (${processedCount}곡)`
			);

			await utils.sleep(1000)
		}

		// 전체 악곡 데이터 수집 완료 알림
		progressCallback(
			currentProgress,
			totalProgress,
			`모든 난이도 악곡 데이터 수집 완료 (총 ${musicData.length}곡)`
		);

		return musicData
	}

	/**
	 * 레이팅 대상 악곡 데이터를 수집합니다.
	 * @param {string} url - 레이팅 페이지 URL
	 * @param {Array} musicData - 기존 수집된 악곡 데이터
	 * @param {Function} progressCallback - 진행상황 업데이트 콜백
	 * @returns {Array} 레이팅 악곡 데이터
	 */
	async function collectRatingMusicData(url, musicData, progressCallback) {
		const doc = await utils.fetchPageDoc(url)
		const musicForms = doc.getElementsByTagName('form')
		const ratingMusicData = []
		
		// 진행상황 업데이트 (데이터 가져오기 시작)
		progressCallback(progressCount, fullProgressCount, 
			url.includes('Best') ? '베스트 30 곡 정보 분석 중...' : '신곡 20곡 정보 분석 중...');

		for (const form of musicForms) {
			const title = form.querySelector('.music_title')?.textContent?.trim()
			if (!title) continue

			const diffValue = Number(
				form.querySelector('input[type="hidden"][name="diff"]')?.getAttribute('value')
			)
			const difficulty = utils.getDifficultyName(diffValue)

			const scoreElement = form.querySelector('.play_musicdata_highscore')?.querySelector('span')
			const score = scoreElement ? Number(scoreElement.textContent.replaceAll(',', '')) : 0

			// 기본값 설정
			let playRank = "D"
			let clearType = "FAIL"
			let comboType = "NO_COMBO"
			let CtCType = "NO_SYNC"

			// 기존 데이터에서 일치하는 곡 정보 찾기
			const existingMusic = musicData.find(
				(m) => m.title === title && m.difficulty === difficulty && m.score === score
			)

			if (existingMusic) {
				playRank = existingMusic.playRank || "D"
				clearType = existingMusic.clearType || "FAIL"
				comboType = existingMusic.comboType || "NO_COMBO"
				CtCType = existingMusic.CtCType || "NO_SYNC"
			}

			const idx = Number.parseInt(
				form.querySelector('input[type="hidden"][name="idx"]')?.getAttribute('value') || '0'
			)

			ratingMusicData.push({
				title,
				difficulty,
				score,
				playRank,
				clearType,
				comboType,
				CtCType,
				idx
			})
		}

		// 전체 데이터 처리 완료 알림
		progressCallback(progressCount, fullProgressCount, 
			url.includes('Best') ? '베스트 30 곡 분석 완료' : '신곡 20곡 분석 완료');

		return ratingMusicData;
	}
}

// 스크립트 실행
main()
