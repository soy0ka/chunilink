'use client'
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface ProfileLinkProps {
	slug: string
}

export const ProfileLink: React.FC<ProfileLinkProps> = ({ slug }) => {
	const [copied, setCopied] = useState(false)

	const profileUrl = `https://chuni.yoru.icu/profile/${slug}`

	const copyToClipboard = () => {
		navigator.clipboard.writeText(profileUrl).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	return (
		<div className="mt-2 flex items-center">
			<div className="group flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
				<span className="max-w-[200px] truncate text-sm font-medium text-gray-600 md:max-w-xs dark:text-gray-300">
					{profileUrl}
				</span>
				<button
					onClick={copyToClipboard}
					className="text-gray-500 hover:text-indigo-600 focus:outline-none dark:text-gray-400 dark:hover:text-indigo-400"
					aria-label="프로필 링크 복사"
				>
					{copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
				</button>
			</div>
		</div>
	)
}

export default ProfileLink
