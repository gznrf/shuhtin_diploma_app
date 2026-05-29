import Title from '@/components/ui/title/Title'
import HabitsList from './habits-list/HabitsList'
import styles from './Habits.module.scss'

const Habits = () => {
	return (
		<section className={styles.habits}>
			<Title
				align='center'
				size='md'
			>
				Топ полезных привычек
				<span>осознанного питания</span>
			</Title>

			<div className={styles.habits_container}>
				<HabitsList />
			</div>
		</section>
	)
}

export default Habits
