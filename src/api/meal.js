import { StorageService } from '@/services/storage.service'

const API = 'http://localhost:3001/meals'

export const getMeals = async (date) => {
	const token = new StorageService().getItem('token')

	const res = await fetch(`${API}?date=${date}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return res.json()
}

export const getMealStats = async () => {
	const token = new StorageService().getItem('token')

	const res = await fetch('http://localhost:3001/meals/stats', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Не удалось получить статистику')
	}

	return data
}

export const createMeal = async (data) => {
	const token = new StorageService().getItem('token')

	const res = await fetch(API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})

	return res.json()
}

export const deleteMeal = async (id) => {
	const token = new StorageService().getItem('token')

	await fetch(`${API}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
}
