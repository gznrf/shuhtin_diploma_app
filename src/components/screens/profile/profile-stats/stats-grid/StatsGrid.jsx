import { FaPlateWheat } from 'react-icons/fa6'
import { FiActivity, FiBarChart2, FiTarget } from 'react-icons/fi'
import styles from './StatsGrid.module.scss'

const StatsGrid = ({ user, stats, goalLabel }) => {
	return (
		<div className={styles.statsGrid}>
			<div className={styles.miniCard}>
				<FiActivity className={styles.miniCardIcon} />
				<span className={styles.miniCardLabel}>Анализов</span>
				<span className={styles.miniCardValue}>{user?.analysisCount || 0}</span>
			</div>

			<div className={styles.miniCard}>
				<FiBarChart2 className={styles.miniCardIcon} />
				<span className={styles.miniCardLabel}>Средние калории</span>
				<span className={styles.miniCardValue}>
					{stats?.averageCalories || 0}
				</span>
			</div>

			<div className={styles.miniCard}>
				<FaPlateWheat className={styles.miniCardIcon} />
				<span className={styles.miniCardLabel}>Приёмов пищи</span>
				<span className={styles.miniCardValue}>{stats?.totalMeals || 0}</span>
			</div>

			<div className={styles.miniCard}>
				<FiTarget className={styles.miniCardIcon} />
				<span className={styles.miniCardLabel}>Цель</span>
				<span className={styles.miniCardValue}>{goalLabel}</span>
			</div>
		</div>
	)
}

export default StatsGrid
