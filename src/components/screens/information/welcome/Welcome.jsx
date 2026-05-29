import Title from '@/components/ui/title/Title'
import ScrollPlates from './scroll-plates/ScrollPlates'
import styles from './Welcome.module.scss'

const Welcome = () => {
	return (
		<section className={styles.welcome}>
			<Title>
				Не просто тренд,
				<br />
				<span>а инвестиция в себя</span>
			</Title>
			<ScrollPlates />
		</section>
	)
}

export default Welcome
