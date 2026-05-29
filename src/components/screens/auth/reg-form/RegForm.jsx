import { registerUser } from '@/api/auth'
import { showNotification } from '@/services/notification.service'
import { useEffect, useRef, useState } from 'react'
import styles from '../Auth.module.scss'
import FormButton from './form-button/FormButton'
import InputContainer from './input-container/InputContainer'
import RegisterLink from './register-link/RegisterLink'

const RegForm = ({ setIsAuthForm }) => {
	const inputRef = useRef()

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	})
	const [loading, setLoading] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (formData.name.trim().length < 2) {
			showNotification('Ваше имя должно содержать минимум 2 буквы', 'error')
			setLoading(false)
			return
		}

		if (formData.email.trim().length < 10) {
			showNotification(
				'Ваш email должен содержать минимум 10 символов',
				'error'
			)
			setLoading(false)
			return
		}

		if (formData.password.trim().length <= 3) {
			showNotification('Пароль должен содержать минимум 4 символа', 'error')
			setLoading(false)
			return
		}

		try {
			const data = await registerUser(formData)
			showNotification(data.message || 'Регистрация успешна', 'success')
			setFormData({
				name: '',
				email: '',
				password: ''
			})

			setTimeout(() => {
				setIsAuthForm(true)
			}, 1000)
		} catch (error) {
			showNotification(error.message, 'error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1 className={styles.title}>Регистрация</h1>

			<InputContainer
				formData={formData}
				handleChange={handleChange}
				ref={inputRef}
			/>

			<FormButton loading={loading} />

			<RegisterLink setIsAuthForm={setIsAuthForm} />
		</form>
	)
}

export default RegForm
