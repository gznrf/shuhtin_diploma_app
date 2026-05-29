import styles from './ProgressBlock.module.scss'

const ProgressBlock = ({ profileProgress }) => {
	return (
		<div className={styles.progressBlock}>
			<div className={styles.progressHeader}>
				<span className={styles.title}>Заполненность профиля</span>
				<span className={styles.percent}>{profileProgress}%</span>
			</div>

			<div className={styles.progressBar}>
				<div
					className={styles.fill}
					style={{ width: `${profileProgress}%` }}
				></div>
			</div>

			<p className={styles.progressText}>
				Добавь больше данных, чтобы получать более точные рекомендации
			</p>
		</div>
	)
}

export default ProgressBlock
