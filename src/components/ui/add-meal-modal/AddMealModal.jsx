import { useEffect, useState } from 'react'
import styles from './AddMealModal.module.scss'

const AddMealModal = ({ onClose, onSubmit, mealType }) => {
	const [form, setForm] = useState({
		title: '',
		calories: '',
		protein: '',
		fat: '',
		carbs: ''
	})

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		onSubmit({
			...form,
			mealType
		})
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
				<h2 className={styles.modal__title}>Добавить блюдо</h2>

				<form
					className={styles.modal__form}
					onSubmit={handleSubmit}
				>
					<input
						className={styles.modal__form__input}
						name='title'
						placeholder='Название'
						onChange={handleChange}
					/>

					<input
						className={styles.modal__form__input}
						name='calories'
						placeholder='Калории'
						onChange={handleChange}
					/>

					<input
						className={styles.modal__form__input}
						name='protein'
						placeholder='Белки'
						onChange={handleChange}
					/>

					<input
						className={styles.modal__form__input}
						name='fat'
						placeholder='Жиры'
						onChange={handleChange}
					/>

					<input
						className={styles.modal__form__input}
						name='carbs'
						placeholder='Углеводы'
						onChange={handleChange}
					/>

					<div className={styles.modal__actions}>
						<button
							className={`${styles.addBtn} ${styles.btn}`}
							type='submit'
						>
							Добавить
						</button>

						<button
							className={`${styles.cancelBtn} ${styles.btn}`}
							type='button'
							onClick={onClose}
							aria-label='Закрыть модальное окно'
						>
							+
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddMealModal
