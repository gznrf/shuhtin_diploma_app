import { showNotification } from '@/services/notification.service'
import { StorageService } from '@/services/storage.service'
import { useState } from 'react'
import styles from './AddToDiet.module.scss'

const AddToDiet = ({ data }) => {
	const today = new Date().toISOString().split('T')[0]

	const [mealType, setMealType] = useState('lunch')
	const [selectedDate, setSelectedDate] = useState(today)
	const [loading, setLoading] = useState(false)

	const handleAddToDiet = async () => {
		try {
			const token = new StorageService().getItem('token')

			if (!token) {
				showNotification('Сначала авторизуйся', 'error')
				return
			}

			setLoading(true)

			const res = await fetch('http://localhost:3001/meals', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					date: selectedDate,
					mealType,
					title: data.foods.map((f) => f.name).join(', '),
					calories: data.total.calories,
					protein: data.total.protein_g,
					fat: data.total.fat_g,
					carbs: data.total.carbs_g
				})
			})

			const result = await res.json().catch(() => null)

			if (!res.ok) {
				throw new Error(result?.message || 'Не удалось добавить в рацион')
			}

			showNotification('Добавлено в рацион', 'success')
		} catch (e) {
			console.error(e)
			showNotification(e.message || 'Ошибка добавления', 'error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.addToDiet}>
			<div className={styles.addRow}>
				<input
					type='date'
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					className={styles.date}
				/>

				<select
					value={mealType}
					onChange={(e) => setMealType(e.target.value)}
					className={styles.select}
				>
					<option value='breakfast'>Завтрак</option>
					<option value='lunch'>Обед</option>
					<option value='dinner'>Ужин</option>
					<option value='snack'>Перекус</option>
				</select>

				<button
					type='button'
					onClick={handleAddToDiet}
					className={styles.addBtn}
					disabled={loading}
				>
					{loading ? 'Добавление...' : 'Добавить'}
				</button>
			</div>
		</div>
	)
}

export default AddToDiet
