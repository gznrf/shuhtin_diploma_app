import styles from '@/components/screens/auth/Auth.module.scss'

const RegisterLink = ({ setIsAuthForm }) => {
	return (
		<div className={styles.register_link}>
			<p>
				Нету аккаунта?
				<br />
				<a
					onClick={(e) => {
						e.preventDefault()
						setIsAuthForm(false)
					}}
					href='#'
				>
					Зарегистрироваться
				</a>
			</p>
		</div>
	)
}

export default RegisterLink
