import { getMealStats } from '@/api/meal'
import { useEffect, useState } from 'react'

export const useProfileStats = () => {
	const [stats, setStats] = useState({
		totalMeals: 0,
		averageCalories: 0
	})

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await getMealStats()
				setStats(data)
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		}

		fetchStats()
	}, [])

	return { stats, loading }
}
