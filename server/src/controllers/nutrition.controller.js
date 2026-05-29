import prisma from '../config/prisma.js'
import {
	analyzeMealWithGigaChat,
	getAccessToken
} from '../services/nutrition.service.js'

export const healthCheck = (req, res) => {
	res.json({ ok: true, service: 'gigachat-nutrition-api' })
}

export const testToken = async (req, res) => {
	try {
		const token = await getAccessToken()

		return res.json({
			ok: true,
			token: token.slice(0, 20) + '...'
		})
	} catch (error) {
		return res.status(500).json({
			error: error.message
		})
	}
}

export const analyzeMeal = async (req, res) => {
	try {
		const { meal } = req.body

		if (!meal?.trim()) {
			return res.status(400).json({
				error: 'Поле meal обязательно'
			})
		}

		const parsed = await analyzeMealWithGigaChat(meal)

		await prisma.user.update({
			where: { id: req.user.id },
			data: {
				analysisCount: {
					increment: 1
				}
			}
		})
		console.log(req.user)
		return res.json(parsed)
	} catch (error) {
		console.error('Analyze meal error:', error)

		return res.status(500).json({
			error: error.message || 'Внутренняя ошибка сервера'
		})
	}
}
