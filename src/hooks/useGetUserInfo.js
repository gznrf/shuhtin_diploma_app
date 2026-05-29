import { getCurrentUser } from '@/api/auth'
import { StorageService } from '@/services/storage.service'
import { useCallback, useEffect, useState } from 'react'

export const useGetUserInfo = () => {
	const [user, setUser] = useState(() => {
		const storedUser = new StorageService().getItem('user')
		return storedUser || null
	})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchUser = useCallback(async () => {
		try {
			setLoading(true)
			setError('')

			const data = await getCurrentUser()

			setUser(data)
			new StorageService().setItem('user', JSON.stringify(data))
		} catch (error) {
			setError(error.message)
			setUser(null)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	useEffect(() => {
		const handleUserUpdated = () => {
			const storedUser = new StorageService().getItem('user')
			setUser(storedUser ? JSON.parse(storedUser) : null)
		}

		window.addEventListener('user-updated', handleUserUpdated)

		return () => {
			window.removeEventListener('user-updated', handleUserUpdated)
		}
	}, [])

	return {
		user,
		loading,
		error,
		refetch: fetchUser
	}
}
