import './Spinner.css'

const DEFAULT = {
	color: '#000000',
	size: 124
}

interface SpinnerProps {
	pixelsSize?: number
	hexColor?: string
	customClass?: string
}

const Spinner = ({ hexColor, pixelsSize, customClass }: SpinnerProps) => {
	const color = hexColor ? hexColor : DEFAULT.color
	const size = pixelsSize ? pixelsSize : DEFAULT.size

	return (
		<svg
			className={`${customClass ? customClass : ''}`}
			id='loading-spinner-svg'
			viewBox='0 0 50 50'
			style={{ height: `${size}px`, width: `${size}px` }}
		>
			<circle
				id='loading-spinner-circle'
				cx='25'
				cy='25'
				r='20'
				fill='none'
				strokeWidth='5'
				style={{ stroke: color }}
			></circle>
		</svg>
	)
}

export default Spinner
