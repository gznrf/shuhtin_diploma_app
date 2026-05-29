import { motion } from 'framer-motion'
import styles from './MealInputSection.module.scss'
import InputBlock from './input-block/InputBlock'
import SubmitBlock from './submit-block/SubmitBlock'

const MealInputSection = ({
	meal,
	setMeal,
	loading,
	handleKeyDown,
	handleExampleClick,
	analyzeMeal
}) => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			className={styles.meal_input_section}
		>
			<InputBlock
				meal={meal}
				setMeal={setMeal}
				handleKeyDown={handleKeyDown}
				handleExampleClick={handleExampleClick}
			/>

			<SubmitBlock
				loading={loading}
				analyzeMeal={analyzeMeal}
			/>
		</motion.section>
	)
}

export default MealInputSection
