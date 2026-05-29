import { motion } from 'framer-motion'
import { useEffect } from 'react'

import Layout from '@/components/layout/Layout'
import Title from '@/components/ui/title/Title'
import styles from './Recommendation.module.scss'
import RecContainer from './rec-container/RecContainer'
import { useRec } from './useRec'

const Recommendation = () => {
	const { data, loading, refreshing, fetchRecommendations } = useRec()

	useEffect(() => {
		fetchRecommendations()
	}, [])
	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className={styles.page}>
					<Title size='md'>
						Рекомендации <span>на основе вашего рациона</span>
					</Title>
					<RecContainer
						loading={loading}
						data={data}
						fetchRecommendations={fetchRecommendations}
						refreshing={refreshing}
					/>
				</div>
			</motion.section>
		</Layout>
	)
}

export default Recommendation
