import Layout from '@/components/layout/Layout'
import AddMealModal from '@/components/ui/add-meal-modal/AddMealModal'
import Title from '@/components/ui/title/Title'
import { motion } from 'framer-motion'
import DietHeader from './diet-header/DietHeader'
import DietMain from './diet-main/DietMain'
import styles from './Diet.module.scss'
import { useDiet } from './useDiet'

const Diet = () => {
	const {
		date,
		setDate,
		isOpen,
		setIsOpen,
		selectedType,
		setSelectedType,
		handleAddMeal,
		handleDelete,
		grouped,
		mealTypes,
		totalCalories
	} = useDiet()

	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<Title size='md'>
					Правильный рацион — <span>структура твоего питания</span>
				</Title>
				<div className={styles.page}>
					<div className={styles.container}>
						<DietHeader
							date={date}
							setDate={setDate}
							totalCalories={totalCalories}
						/>

						<DietMain
							mealTypes={mealTypes}
							setSelectedType={setSelectedType}
							setIsOpen={setIsOpen}
							grouped={grouped}
							handleDelete={handleDelete}
						/>
					</div>

					{isOpen && (
						<AddMealModal
							onClose={() => setIsOpen(false)}
							onSubmit={handleAddMeal}
							mealType={selectedType}
						/>
					)}
				</div>
			</motion.section>
		</Layout>
	)
}

export default Diet
