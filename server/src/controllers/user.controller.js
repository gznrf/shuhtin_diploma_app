import bcrypt from 'bcrypt'
import prisma from '../config/prisma.js'

export const createUser = async (req, res) => {
	try {
		const { email, password, name, age, weight, height } = req.body

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email и password обязательны'
			})
		}

		const existingUser = await prisma.user.findUnique({
			where: { email }
		})

		if (existingUser) {
			return res.status(409).json({
				message: 'Пользователь с таким email уже существует'
			})
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name
			}
		})

		return res.status(201).json({
			message: 'Пользователь создан',
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				createdAt: user.createdAt
			}
		})
	} catch (error) {
		console.error('Create user error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}

export const getUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				createdAt: true
			}
		})

		return res.json(users)
	} catch (error) {
		console.error('Get users error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}
