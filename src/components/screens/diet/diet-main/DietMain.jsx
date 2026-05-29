import styles from './DietMain.module.scss'

const DietMain = ({
	mealTypes,
	setSelectedType,
	setIsOpen,
	grouped,
	handleDelete
}) => {
	return (
		<div className={styles.sections}>
			{Object.entries(mealTypes).map(([key, label]) => (
				<div
					key={key}
					className={styles.section}
				>
					<div className={styles.sectionHeader}>
						<h2>{label}</h2>

						<button
							onClick={() => {
								setSelectedType(key)
								setIsOpen(true)
							}}
						>
							Добавить
						</button>
					</div>

					<div className={styles.list}>
						{grouped[key].length === 0 && <p className={styles.empty}>Пусто</p>}

						{grouped[key].map((meal) => (
							<div
								key={meal.id}
								className={styles.card}
							>
								<div>
									<h4>{meal.title}</h4>
									<p>{meal.calories} ккал</p>
									<p>
										Б {meal.protein || 0} / Ж {meal.fat || 0} / У{' '}
										{meal.carbs || 0}
									</p>
								</div>

								<button
									onClick={() => handleDelete(meal.id)}
									className={styles.delete}
								>
									×
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default DietMain
