import Layout from '@/components/layout/Layout'
import Title from '@/components/ui/title/Title'
import { showNotification } from '@/services/notification.service'
import { StorageService } from '@/services/storage.service'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Loader from './loader/Loader'
import MealInputSection from './meal-input-section/MealInputSection'
import styles from './Nutrition.module.scss'
import Result from './result/Result'

const Nutrition = () => {
	const [meal, setMeal] = useState('')
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const token = new StorageService().getItem('token')

	const analyzeMeal = async () => {
		if (!meal.trim()) {
			showNotification('Сначала опиши свой прием пищи', 'error')
			return
		}

		setLoading(true)
		setData(null)

		try {
			if (!token) {
				showNotification('Сначала войди в аккаунт', 'error')
				return
			}

			const res = await fetch('http://localhost:3001/analyze-meal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ meal: meal.trim() })
			})

			const result = await res.json()

			if (!res.ok) {
				throw new Error(result?.error || 'Ошибка анализа')
			}

			if (!result?.total || !Array.isArray(result?.foods)) {
				throw new Error('Некорректный ответ сервера')
			}

			setData(result)
		} catch (e) {
			console.error(e)
			showNotification('Ошибка анализа', 'error')
		} finally {
			setLoading(false)
		}
	}

	const handleExampleClick = (example) => {
		setMeal(example)
	}

	const handleKeyDown = (e) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			analyzeMeal()
		}
	}

	return (
		<Layout>
			<div className={styles.page}>
				<div className={styles.page__container}>
					<motion.section
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<Title size='md'>
							Анализ питания —<span>баланс приема пищи</span>
						</Title>
					</motion.section>

					<MealInputSection
						meal={meal}
						setMeal={setMeal}
						loading={loading}
						handleKeyDown={handleKeyDown}
						handleExampleClick={handleExampleClick}
						analyzeMeal={analyzeMeal}
					/>

					<AnimatePresence mode='wait'>
						{loading && <Loader />}
						{data && !loading && <Result data={data} />}
					</AnimatePresence>
				</div>
			</div>
		</Layout>
	)
}

export default Nutrition
