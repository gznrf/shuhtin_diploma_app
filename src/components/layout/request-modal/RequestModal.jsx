import { createRequest } from '@/api/request'
import { showNotification } from '@/services/Notification.service'
import { formatPhone } from '@/utils/formatPhone'
import { useEffect, useState } from 'react'
import styles from './RequestModal.module.scss'

const RequestModal = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		number: ''
	})
	const [loading, setLoading] = useState(false)

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

	const handleChange = (e) => {
		const { name, value } = e.target

		if (name === 'number') {
			setFormData((prev) => ({
				...prev,
				number: formatPhone(value)
			}))
			return
		}

		setFormData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const isValidPhone = (phone) => {
		return phone.replace(/\D/g, '').length === 11
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (!isValidPhone(formData.number)) {
			showNotification('Введите корректный номер', 'error')
			setLoading(false)
			return
		}

		if (formData.name.trim().length < 2) {
			showNotification('Ваше имя должно содержать минимум 2 буквы', 'error')
			setLoading(false)
			return
		}

		try {
			await createRequest(formData)

			showNotification('Заявка отправлена', 'success')

			setFormData({
				name: '',
				number: ''
			})

			onClose()
		} catch (error) {
			showNotification(error.message || 'Ошибка отправки', 'error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className={styles.title}>Персональная консультация</h2>
				<p className={styles.text}>Оставь заявку, и с тобой свяжутся</p>

				<form
					className={styles.form}
					onSubmit={handleSubmit}
				>
					<input
						type='text'
						name='name'
						placeholder='Имя'
						value={formData.name}
						onChange={handleChange}
						className={styles.input}
					/>

					<input
						type='tel'
						name='number'
						placeholder='+7 (___) ___-__-__'
						value={formData.number}
						onChange={handleChange}
						className={styles.input}
					/>

					<div className={styles.actions}>
						<button
							type='button'
							className={styles.cancelBtn}
							onClick={onClose}
						>
							Отмена
						</button>

						<button
							type='submit'
							className={styles.submitBtn}
							disabled={loading}
						>
							{loading ? 'Отправка...' : 'Отправить'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RequestModal
