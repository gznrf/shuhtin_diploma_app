import { apiUrl } from '@/api/base'
import { updateCurrentUser } from '@/api/auth'
import { useGetUserInfo } from '@/hooks/useGetUserInfo'
import { showNotification } from '@/services/notification.service'
import { StorageService } from '@/services/storage.service'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useProfile = () => {
	const navigate = useNavigate()
	const { user, refetch } = useGetUserInfo()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		age: '',
		weight: '',
		height: '',
		goal: ''
	})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || '',
				email: user.email || '',
				age: user.age ?? '',
				weight: user.weight ?? '',
				height: user.height ?? '',
				goal: user.goal || ''
			})
		}
	}, [user])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setLoading(true)

			const data = await updateCurrentUser(formData)

			new StorageService().setItem('user', data.user)

			showNotification('Профиль обновлён', 'success')
			await refetch()
		} catch (e) {
			showNotification(e.message, 'error')
		} finally {
			setLoading(false)
		}
	}

	const handleLogout = () => {
		new StorageService().removeItem('token')
		new StorageService().removeItem('user')
		showNotification('Вы успешно вышли из аккаунта', 'success')
		navigate('/auth')
	}

	const handleDeleteAccount = async () => {
		if (!window.confirm('Удалить аккаунт?')) return

		try {
			const token = new StorageService().getItem('token')

			const res = await fetch(apiUrl('/auth/me'), {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})

			const data = await res.json().catch(() => null)

			if (!res.ok) {
				throw new Error(data?.message || 'Не удалось удалить аккаунт')
			}

			new StorageService().removeItem('token')
			new StorageService().removeItem('user')

			showNotification('Аккаунт удалён', 'success')
			navigate('/auth')
		} catch (error) {
			showNotification(error.message || 'Ошибка удаления аккаунта', 'error')
		}
	}

	return {
		user,
		formData,
		handleChange,
		handleSubmit,
		handleLogout,
		handleDeleteAccount,
		loading
	}
}
