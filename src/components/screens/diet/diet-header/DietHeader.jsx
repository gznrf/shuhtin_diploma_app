import styles from './DietHeader.module.scss'

const DietHeader = ({ date, setDate, totalCalories }) => {
	return (
		<div className={styles.header}>
			<input
				type='date'
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className={styles.date}
			/>

			<p className={styles.total}>
				Всего: <b>{totalCalories} ккал</b>
			</p>
		</div>
	)
}

export default DietHeader
