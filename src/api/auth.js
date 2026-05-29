import { apiUrl } from '@/api/base'
import { StorageService } from '@/services/storage.service'

export const registerUser = async ({ name, email, password }) => {
	const res = await fetch(apiUrl('/auth/register'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password })
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Ошибка регистрации')
	}

	return data
}

export const loginUser = async ({ email, password }) => {
	const res = await fetch(apiUrl('/auth/login'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Ошибка авторизации')
	}

	return data
}

export const getCurrentUser = async () => {
	const token = new StorageService().getItem('token')

	if (!token) {
		throw new Error('Токен не найден')
	}

	const res = await fetch(apiUrl('/auth/me'), {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Не удалось получить пользователя')
	}

	return data
}

export const updateCurrentUser = async (userData) => {
	const token = new StorageService().getItem('token')

	if (!token) {
		throw new Error('Токен не найден')
	}

	const res = await fetch(apiUrl('/auth/me'), {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(userData)
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Не удалось обновить профиль')
	}

	return data
}
