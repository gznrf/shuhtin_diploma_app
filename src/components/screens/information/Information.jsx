import Layout from '@/components/layout/Layout'
import { motion } from 'framer-motion'
import Habits from './habits/Habits'
import HarvardPlate from './harvard-plate/HarvardPlate'
import NutritionGroups from './nutrition-groups/NutritionGroups'
import Welcome from './welcome/Welcome'

const Information = () => {
	return (
		<>
			<Layout>
				<motion.main
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<Welcome />
					<NutritionGroups />
					<HarvardPlate />
					<Habits />
				</motion.main>
			</Layout>
		</>
	)
}

export default Information
