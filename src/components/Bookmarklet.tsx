'use client'
import getConfig from 'next/config'
import { useEffect, useState } from 'react'

const Bookmarklet = () => {
	const [bookmarkletCode, setBookmarkletCode] = useState('')
	const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: { baseUrl: '' } }

	useEffect(() => {
		const baseUrl = publicRuntimeConfig.baseUrl || window.location.origin
		setBookmarkletCode(
			`javascript:(function(){var d=document,s=d.createElement('script');s.src='${baseUrl}/linker.js?t='+new Date().getTime();d.body.appendChild(s);})();`
		)
	}, [publicRuntimeConfig.baseUrl])

	return (
		<div>
			{bookmarkletCode && (
				<a href={bookmarkletCode} className="bookmarklet-link">
					드래그하여 북마크바에 저장
				</a>
			)}
		</div>
	)
}

export default Bookmarklet
