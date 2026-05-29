import { FiPhone } from 'react-icons/fi'
import styles from './RequestButton.module.scss'

const RequestButton = ({ onClick }) => {
	return (
		<button
			type='button'
			className={styles.button}
			onClick={onClick}
			aria-label='Открыть форму заявки'
		>
			<FiPhone />
		</button>
	)
}

export default RequestButton
