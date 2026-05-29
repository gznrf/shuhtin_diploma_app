import styles from './Table.module.scss'

const Table = ({ data }) => {
	return (
		<div className={styles.table_card}>
			<h2 className={styles.table_card__title}>Состав приема пищи</h2>

			<div className={styles.table_card__wrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Продукт</th>
							<th>Вес</th>
							<th>Ккал</th>
							<th>Белки</th>
							<th>Жиры</th>
							<th>Углеводы</th>
						</tr>
					</thead>

					<tbody>
						{data.foods.map((food, i) => (
							<tr key={`${food.name}-${i}`}>
								<td>{food.name}</td>
								<td>{food.weight_g} г</td>
								<td>{food.calories}</td>
								<td>{food.protein_g} г</td>
								<td>{food.fat_g} г</td>
								<td>{food.carbs_g} г</td>
							</tr>
						))}
					</tbody>

					<tfoot>
						<tr>
							<td>Итого</td>
							<td>—</td>
							<td>{data.total.calories}</td>
							<td>{data.total.protein_g} г</td>
							<td>{data.total.fat_g} г</td>
							<td>{data.total.carbs_g} г</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}

export default Table
