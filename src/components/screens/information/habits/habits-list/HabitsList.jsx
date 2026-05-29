import styles from '../Habits.module.scss'
import ListItem from './list-item/ListItem'

const habits = [
	'Есть медленнее обычного',
	'Не отвлекаться на гаджеты, компьютер или телевизор',
	'Не есть через силу и не переедать',
	'Планировать меню на неделю',
	'Разорвать связь между эмоциями и сладким – не заедать стресс'
]

const HabitsList = () => {
	return (
		<ul className={styles.habits_container_list}>
			{habits.map((item, index) => (
				<ListItem key={index}>{item}</ListItem>
			))}
		</ul>
	)
}

export default HabitsList
