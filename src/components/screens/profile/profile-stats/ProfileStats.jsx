import styles from './ProfileStats.module.scss'
import InfoCard from './info-card/InfoCard'
import ProgressBlock from './progress-block/ProgressBlock'
import StatsGrid from './stats-grid/StatsGrid'

const ProfileStats = ({ user, stats }) => {
	const goalLabel =
		user?.goal === 'lose'
			? 'Похудение'
			: user?.goal === 'gain'
				? 'Набор массы'
				: '—'

	const filledFieldsCount = [
		user?.name,
		user?.email,
		user?.age,
		user?.weight,
		user?.height,
		user?.goal
	].filter(Boolean).length

	const profileProgress = Math.round((filledFieldsCount / 6) * 100)

	return (
		<aside className={styles.statsCard}>
			<h2 className={styles.title}>Статистика</h2>

			<StatsGrid
				user={user}
				stats={stats}
				goalLabel={goalLabel}
			/>
			<ProgressBlock profileProgress={profileProgress} />

			<InfoCard user={user} />
		</aside>
	)
}

export default ProfileStats
