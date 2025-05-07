import React from 'react'
import StatusIcon from './StatusIcon'

interface StatusLabelProps {
	status: 'pending' | 'processing' | 'complete' | 'error'
	label: string
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status, label }) => {
	const textColor =
		status === 'complete'
			? 'text-green-600 dark:text-green-400'
			: status === 'error'
				? 'text-red-600 dark:text-red-400'
				: status === 'pending'
					? 'text-yellow-600 dark:text-yellow-400'
					: 'text-gray-700 dark:text-gray-300'

	return (
		<div className="flex items-center gap-3">
			<StatusIcon status={status} />
			<span className={`text-sm ${textColor}`}>{label}</span>
		</div>
	)
}

export default StatusLabel
