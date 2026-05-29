import styles from './SubmitBlock.module.scss'

const SubmitBlock = ({ loading, analyzeMeal }) => {
	return (
		<div className={styles.submit_block}>
			<button
				onClick={analyzeMeal}
				className={styles.submit_block__button}
				disabled={loading}
				type='button'
			>
				{loading ? 'Анализируем...' : 'Анализировать'}
			</button>

			<div className={styles.submit_block__note}>
				Ctrl/Cmd + Enter для быстрого запуска
			</div>
		</div>
	)
}

export default SubmitBlock
