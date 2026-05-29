import styles from '@/components/screens/auth/Auth.module.scss'

const FormButton = ({ loading }) => {
	return (
		<button
			type='submit'
			className={styles.btn_log}
			disabled={loading}
		>
			{loading ? 'Загрузка...' : 'Войти'}
		</button>
	)
}

export default FormButton
