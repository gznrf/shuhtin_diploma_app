import styles from '@/components/screens/information/habits/Habits.module.scss'

const ListItem = ({ children }) => {
	return (
		<li className={styles.habits_container_list_item}>
			<span>+</span>
			<p>{children}</p>
		</li>
	)
}

export default ListItem
