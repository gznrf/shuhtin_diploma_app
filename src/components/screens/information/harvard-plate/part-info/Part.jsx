import { useEffect, useState } from 'react'
import styles from './Part.module.scss'

const Part = ({ name, info, position }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	const handleToggle = () => {
		if (isMobile) {
			setIsOpen((prev) => !prev)
		}
	}

	return (
		<div
			className={`${styles.part} ${isOpen ? styles.active : ''}`}
			style={position}
		>
			<div className={styles.tooltip}>
				<h3>{name}</h3>
				<p>{info}</p>
			</div>

			<button
				type='button'
				className={styles.button}
				onClick={handleToggle}
				aria-label={name}
			>
				+
			</button>
		</div>
	)
}

export default Part
