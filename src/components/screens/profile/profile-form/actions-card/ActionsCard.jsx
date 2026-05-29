import { FiLogOut, FiTrash2 } from 'react-icons/fi'
import styles from './ActionsCard.module.scss'

const ActionsCard = ({ handleLogout, handleDeleteAccount }) => {
	return (
		<div className={styles.actionsCard}>
			<button
				type='button'
				className={styles.logoutBtn}
				onClick={handleLogout}
			>
				<FiLogOut className={styles.actionIcon} />
				Выйти из аккаунта
			</button>

			<button
				type='button'
				className={styles.deleteBtn}
				onClick={handleDeleteAccount}
			>
				<FiTrash2 className={styles.actionIcon} />
				Удалить аккаунт
			</button>
		</div>
	)
}

export default ActionsCard
