import prisma from '../config/prisma.js'

export const createRequest = async (req, res) => {
	try {
		const { name, number } = req.body

		if (!name || !number) {
			return res.status(400).json({
				message: 'Имя и номер обязательны'
			})
		}

		const request = await prisma.request.create({
			data: {
				name: name.trim(),
				number: number.trim()
			}
		})

		return res.status(201).json({
			message: 'Заявка отправлена',
			request
		})
	} catch (error) {
		console.error('Create request error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}
