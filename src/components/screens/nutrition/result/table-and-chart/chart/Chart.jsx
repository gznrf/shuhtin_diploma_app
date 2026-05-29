import { COLORS } from '@/components/screens/nutrition/nutrition.constants'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'
import styles from './Chart.module.scss'

const Chart = ({ data }) => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const chartData = useMemo(() => {
		if (!data?.total) return []

		return [
			{ name: 'Белки', value: data.total.protein_g ?? 0 },
			{ name: 'Жиры', value: data.total.fat_g ?? 0 },
			{ name: 'Углеводы', value: data.total.carbs_g ?? 0 }
		].filter((item) => item.value > 0)
	}, [data])

	const outerRadius =
		screenWidth <= 420
			? 65
			: screenWidth <= 640
				? 80
				: screenWidth <= 900
					? 95
					: 110

	const showLabels = screenWidth > 640

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={styles.chart_card}
		>
			<h2 className={styles.chart_card__title}>Соотношение БЖУ</h2>

			<div className={styles.chart_card__wrapper}>
				{chartData.length > 0 ? (
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<PieChart>
							<Pie
								data={chartData}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='45%'
								outerRadius={outerRadius}
								label={showLabels}
							>
								{chartData.map((entry, index) => (
									<Cell
										key={entry.name}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>

							<Tooltip formatter={(value) => [`${value} г`, 'Количество']} />

							<Legend
								verticalAlign='bottom'
								align='center'
								iconType='circle'
								wrapperStyle={{
									fontSize: screenWidth <= 640 ? '12px' : '14px',
									paddingTop: '8px'
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				) : (
					<div className={styles.chart_card__empty}>
						Нет данных для отображения
					</div>
				)}
			</div>
		</motion.div>
	)
}

export default Chart
