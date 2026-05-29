import styles from './InfoCard.module.scss'

const InfoCard = ({ user }) => {
	return (
		<div className={styles.infoCard}>
			<h3 className={styles.infoTitle}>Физические данные</h3>

			<div className={styles.infoRow}>
				<span className={styles.label}>Возраст</span>
				<span className={styles.value}>{user?.age || '—'}</span>
			</div>

			<div className={styles.infoRow}>
				<span className={styles.label}>Вес</span>
				<span className={styles.value}>
					{user?.weight ? `${user.weight} кг` : '—'}
				</span>
			</div>

			<div className={styles.infoRow}>
				<span className={styles.label}>Рост</span>
				<span className={styles.value}>
					{user?.height ? `${user.height} см` : '—'}
				</span>
			</div>
		</div>
	)
}

export default InfoCard
