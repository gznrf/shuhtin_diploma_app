import { useState } from 'react'
import styles from './Auth.module.scss'
import AuthForm from './auth-form/AuthForm'
import RegForm from './reg-form/RegForm'

const Auth = () => {
	const [isAuthForm, setIsAuthForm] = useState(true)

	return (
		<>
			<div className={styles.auth_container}>
				<div className={styles.wrapper}>
					{isAuthForm ? (
						<AuthForm setIsAuthForm={setIsAuthForm} />
					) : (
						<RegForm setIsAuthForm={setIsAuthForm} />
					)}
				</div>
			</div>
		</>
	)
}

export default Auth
