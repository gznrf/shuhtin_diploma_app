import { HiAcademicCap } from 'react-icons/hi'
import styles from './RecContainer.module.scss'

const RecContainer = ({ loading, data, fetchRecommendations, refreshing }) => {
	return (
		<div className={styles.container}>
			{loading && (
				<div className={styles.message}>
					<p className={styles.loading}>Генерация...</p>
				</div>
			)}

			{!loading && data && data.recommendations?.length > 0 && (
				<div className={styles.rec_block}>
					{data.recommendations.map((rec, i) => (
						<div
							key={i}
							className={styles.card}
						>
							<div className={styles.card_icon}>
								<HiAcademicCap />
							</div>

							<div className={styles.card_info}>
								<h3>{rec.title}</h3>
								<p>{rec.text}</p>
							</div>
						</div>
					))}

					<button
						type='button'
						className={styles.refreshBtn}
						onClick={() => fetchRecommendations(true)}
						disabled={refreshing || loading}
					>
						{refreshing ? 'Обновляем...' : 'Обновить рекомендации'}
					</button>
				</div>
			)}

			{!loading && data && data.recommendations?.length === 0 && (
				<div className={styles.empty}>Нет рекомендаций</div>
			)}
		</div>
	)
}

export default RecContainer
