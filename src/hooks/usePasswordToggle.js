import { useState } from 'react'

export const usePasswordToggle = () => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword((prev) => !prev)
	}

	const inputType = showPassword ? 'text' : 'password'

	return { showPassword, togglePassword, inputType }
}
