import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AuthModal.module.scss'

const AuthModal = ({ isOpen, onClose }) => {
	const navigate = useNavigate()
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className={styles.title}>Требуется авторизация</h2>

				<p className={styles.text}>
					Для доступа к этой странице необходимо войти в аккаунт
				</p>

				<div className={styles.actions}>
					<button
						onClick={() => navigate('/auth')}
						className={styles.loginBtn}
					>
						Войти
					</button>

					<button
						className={styles.closeBtn}
						onClick={onClose}
					>
						+
					</button>
				</div>
			</div>
		</div>
	)
}

export default AuthModal
