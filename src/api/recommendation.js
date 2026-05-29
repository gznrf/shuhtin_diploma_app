import { StorageService } from '@/services/storage.service'

export const getRecommendations = async () => {
	const token = new StorageService().getItem('token')

	const res = await fetch('http://localhost:3001/recommendations', {
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
