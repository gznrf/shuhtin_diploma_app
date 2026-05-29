import { apiUrl } from '@/api/base'
import { StorageService } from '@/services/storage.service'

export const getRecommendations = async () => {
	const token = new StorageService().getItem('token')

	const res = await fetch(apiUrl('/recommendations'), {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Ошибка')
	}

	return data
}
