import { loginUser } from '@/api/auth'
import styles from '@/components/screens/auth/Auth.module.scss'
import { showNotification } from '@/services/notification.service'
import { StorageService } from '@/services/storage.service'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormButton from './form-button/FormButton'
import InputContainer from './input-container/InputContainer'
import RegisterLink from './register-link/RegisterLink'

const AuthForm = ({ setIsAuthForm }) => {
	const navigate = useNavigate()
	const inputRef = useRef()

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	const [formData, setFormData] = useState({
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

		try {
			const data = await loginUser(formData)

			new StorageService().setItem('token', data.token)
			new StorageService().setItem('user', JSON.stringify(data.user))

			navigate('/')
		} catch (error) {
			showNotification(error.message, 'error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1 className={styles.title}>Авторизация</h1>

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

export default AuthForm
