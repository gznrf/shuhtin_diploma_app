import { CARDS_VALUES } from '../../nutrition.constants'
import styles from './Cards.module.scss'

const Cards = ({ data }) => {
	return (
		<div className={styles.cards}>
			{CARDS_VALUES.map((card) => (
				<div
					className={styles.stat_card}
					key={card.key}
				>
					<span className={styles.stat_card__label}>{card.label}</span>
					<span className={styles.stat_card__value}>
						{data.total[card.key]}
					</span>
					<span className={styles.stat_card__unit}>{card.unit}</span>
				</div>
			))}
		</div>
	)
}

export default Cards
