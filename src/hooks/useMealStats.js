import { getMealStats } from '@/api/meal'
import { useCallback, useEffect, useState } from 'react'

export const useMealStats = () => {
	const [stats, setStats] = useState({
		totalMeals: 0,
		averageCalories: 0
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchStats = useCallback(async () => {
		try {
			setLoading(true)
			setError('')

			const data = await getMealStats()
			setStats(data)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchStats()
	}, [fetchStats])

	return {
		stats,
		loading,
		error,
		refetch: fetchStats
	}
}
