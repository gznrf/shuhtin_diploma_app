import prisma from '../config/prisma.js'

export const createMeal = async (req, res) => {
	try {
		const userId = req.user.id

		const { date, mealType, title, calories, protein, fat, carbs } = req.body

		const meal = await prisma.mealEntry.create({
			data: {
				userId,
				date: new Date(date),
				mealType,
				title,
				calories: Number(calories),
				protein: protein ? Number(protein) : null,
				fat: fat ? Number(fat) : null,
				carbs: carbs ? Number(carbs) : null
			}
		})

		res.json(meal)
	} catch (e) {
		res.status(500).json({ message: 'Ошибка создания записи' })
	}
}

export const getMealsByDate = async (req, res) => {
	try {
		const userId = req.user.id
		const { date } = req.query

		const start = new Date(date)
		start.setHours(0, 0, 0, 0)

		const end = new Date(date)
		end.setHours(23, 59, 59, 999)

		const meals = await prisma.mealEntry.findMany({
			where: {
				userId,
				date: {
					gte: start,
					lte: end
				}
			},
			orderBy: { createdAt: 'asc' }
		})

		res.json(meals)
	} catch (e) {
		res.status(500).json({ message: 'Ошибка получения данных' })
	}
}

export const getMealStats = async (req, res) => {
	try {
		const userId = req.user.id

		const meals = await prisma.mealEntry.findMany({
			where: { userId },
			select: {
				date: true,
				calories: true
			}
		})

		const totalMeals = meals.length

		if (totalMeals === 0) {
			return res.json({
				totalMeals: 0,
				averageCalories: 0
			})
		}

		const caloriesByDay = {}

		meals.forEach((meal) => {
			const dayKey = new Date(meal.date).toISOString().split('T')[0]

			if (!caloriesByDay[dayKey]) {
				caloriesByDay[dayKey] = 0
			}

			caloriesByDay[dayKey] += meal.calories
		})

		const dayTotals = Object.values(caloriesByDay)
		const totalCalories = dayTotals.reduce((sum, value) => sum + value, 0)
		const averageCalories = Math.round(totalCalories / dayTotals.length)

		return res.json({
			totalMeals,
			averageCalories
		})
	} catch (error) {
		console.error('Get meal stats error:', error)
		return res.status(500).json({
			message: 'Ошибка получения статистики'
		})
	}
}

export const deleteMeal = async (req, res) => {
	try {
		const { id } = req.params

		await prisma.mealEntry.delete({
			where: { id: Number(id) }
		})

		res.json({ message: 'Удалено' })
	} catch {
		res.status(500).json({ message: 'Ошибка удаления' })
	}
}
