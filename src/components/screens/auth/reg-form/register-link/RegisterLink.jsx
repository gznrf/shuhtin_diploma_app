import styles from '@/components/screens/auth/Auth.module.scss'

const RegisterLink = ({ setIsAuthForm }) => {
	return (
		<div className={styles.register_link}>
			<p>
				Есть аккаунт?
				<br />
				<a
					onClick={(e) => {
						e.preventDefault()
						setIsAuthForm(true)
					}}
					href='#'
				>
					Войти
				</a>
			</p>
		</div>
	)
}

export default RegisterLink
