import { createMeal, deleteMeal, getMeals } from '@/api/meal'
import { useEffect, useState } from 'react'

export const useDiet = () => {
	const today = new Date().toISOString().split('T')[0]

	const [date, setDate] = useState(today)
	const [meals, setMeals] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const [selectedType, setSelectedType] = useState('breakfast')

	const loadMeals = async () => {
		const data = await getMeals(date)
		setMeals(data)
	}

	useEffect(() => {
		loadMeals()
	}, [date])

	const handleAddMeal = async (mealData) => {
		await createMeal({
			...mealData,
			date
		})
		setIsOpen(false)
		loadMeals()
	}

	const handleDelete = async (id) => {
		await deleteMeal(id)
		loadMeals()
	}

	const mealTypes = {
		breakfast: 'Завтрак',
		lunch: 'Обед',
		dinner: 'Ужин',
		snack: 'Перекус'
	}

	const grouped = {
		breakfast: [],
		lunch: [],
		dinner: [],
		snack: []
	}

	meals.forEach((m) => {
		grouped[m.mealType].push(m)
	})

	const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0)

	return {
		date,
		setDate,
		isOpen,
		setIsOpen,
		selectedType,
		setSelectedType,
		handleAddMeal,
		handleDelete,
		mealTypes,
		grouped,
		totalCalories
	}
}
