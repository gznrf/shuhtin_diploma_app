import GroupsIntro from '@/assets/images/nutrition-groups/groups-intro.png'
import styles from './Intro.module.scss'

const Intro = () => {
	return (
		<div className={styles.intro}>
			<div className={styles.intro_text}>
				<h3>Нутрициология — ваш ключ к долголетию и высокому качеству жизни</h3>
				<p>
					Сбалансированное и осознанное питание — это не просто правильно
					подобранная диета, а основа крепкого здоровья, красоты, долгой и
					активной жизни.
					<br />
					<br />
					Как составить рацион, чтобы чувствовать себя отлично каждый день?
					Узнайте в нашем гайде.
					<strong> Здесь ничего лишнего — только польза.</strong>
				</p>
			</div>

			<img
				className={styles.intro_image}
				src={GroupsIntro}
			/>
		</div>
	)
}

export default Intro
