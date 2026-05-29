import { getRecommendations } from '@/api/recommendation'
import { showNotification } from '@/services/notification.service'
import { useState } from 'react'

export const useRec = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [refreshing, setRefreshing] = useState(false)
	const [error, setError] = useState('')

	const fetchRecommendations = async (isManualRefresh = false) => {
		try {
			if (isManualRefresh) {
				setRefreshing(true)
			} else {
				setLoading(true)
			}

			const res = await getRecommendations()
			setData(res)
		} catch (e) {
			console.log(e)
			showNotification(e.message || 'Ошибка загрузки рекомендаций', 'error')
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}

	return {
		data,
		loading,
		refreshing,
		fetchRecommendations
	}
}
