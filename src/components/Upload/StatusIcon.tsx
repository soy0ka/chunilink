import { AlertCircle, Check } from 'lucide-react'

interface IStatusIconProps {
	status: 'pending' | 'processing' | 'complete' | 'error'
}

const StatusIcon: React.FC<IStatusIconProps> = ({ status }) => {
	switch (status) {
		case 'pending':
			return (
				<div className="-full h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600"></div>
			)
		case 'processing':
			return (
				<div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
			)
		case 'complete':
			return <Check className="h-5 w-5 text-green-500" />
		case 'error':
			return <AlertCircle className="h-5 w-5 text-red-500" />
		default:
			return null
	}
}

export default StatusIcon
