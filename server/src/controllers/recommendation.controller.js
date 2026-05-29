import prisma from '../config/prisma.js'
import { getAccessToken } from '../services/nutrition.service.js'

function buildPrompt({ user, stats, meals }) {
	const mealsText = meals.length
		? meals
				.map(
					(m) =>
						`- ${new Date(m.date).toISOString().split('T')[0]} | ${m.mealType} | ${m.title} | ${m.calories} ккал`
				)
				.join('\n')
		: 'Рацион отсутствует'

	return [
		'Ты — ассистент по питанию.',
		'Верни только JSON без текста и markdown.',
		'Дай 10 кратких персональных рекомендаций.',
		'',
		'Формат:',
		'{',
		'  "summary": "string",',
		'  "recommendations": [',
		'    { "title": "string", "text": "string" }',
		'  ]',
		'}',
		'',
		`Цель: ${
			user.goal === 'lose'
				? 'Похудение'
				: user.goal === 'gain'
					? 'Набор массы'
					: 'Не указана'
		}`,
		`Возраст: ${user.age ?? 'нет'}`,
		`Вес: ${user.weight ?? 'нет'}`,
		`Рост: ${user.height ?? 'нет'}`,
		`Анализов: ${user.analysisCount}`,
		`Приёмов пищи: ${stats.totalMeals}`,
		`Средние калории: ${stats.averageCalories}`,
		'',
		'Рацион:',
		mealsText
	].join('\n')
}

function parse(content) {
	try {
		return JSON.parse(content)
	} catch {
		const clean = content.replace(/```json|```/g, '').trim()
		return JSON.parse(clean)
	}
}

export const getRecommendations = async (req, res) => {
	try {
		const userId = req.user.id

		const user = await prisma.user.findUnique({
			where: { id: userId }
		})

		const meals = await prisma.mealEntry.findMany({
			where: { userId },
			orderBy: { date: 'desc' },
			take: 20
		})

		const totalMeals = meals.length

		const byDay = {}
		meals.forEach((m) => {
			const key = new Date(m.date).toISOString().split('T')[0]
			if (!byDay[key]) byDay[key] = 0
			byDay[key] += m.calories
		})

		const days = Object.values(byDay)
		const averageCalories = days.length
			? Math.round(days.reduce((a, b) => a + b, 0) / days.length)
			: 0

		const stats = { totalMeals, averageCalories }

		const token = await getAccessToken()

		const response = await fetch(
			'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					model: 'GigaChat',
					temperature: 0.4,
					messages: [
						{ role: 'system', content: 'Отвечай только JSON' },
						{
							role: 'user',
							content: buildPrompt({ user, stats, meals })
						}
					]
				})
			}
		)

		const data = await response.json()
		const content = data?.choices?.[0]?.message?.content

		const parsed = parse(content)

		res.json(parsed)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: 'Ошибка рекомендаций' })
	}
}
