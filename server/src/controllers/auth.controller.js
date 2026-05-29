import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma.js'

export const register = async (req, res) => {
	try {
		const { name, email, password, age, weight, height } = req.body

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email и пароль обязательны'
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
				name,
				email,
				password: hashedPassword
			}
		})

		return res.status(201).json({
			message: 'Регистрация успешна',
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		})
	} catch (error) {
		console.error('Register error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				message: 'Email и пароль обязательны'
			})
		}

		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (!user) {
			return res.status(401).json({
				message: 'Неверный email или пароль'
			})
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({
				message: 'Неверный email или пароль'
			})
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email
			},
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		return res.json({
			message: 'Авторизация успешна',
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		})
	} catch (error) {
		console.error('Login error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
			select: {
				id: true,
				name: true,
				email: true,
				age: true,
				weight: true,
				height: true,
				goal: true,
				analysisCount: true,
				createdAt: true
			}
		})

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		return res.json(user)
	} catch (error) {
		console.error('Get me error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}

export const updateMe = async (req, res) => {
	try {
		const { name, email, age, weight, height, goal } = req.body

		if (!email) {
			return res.status(400).json({
				message: 'Email обязателен'
			})
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				email,
				NOT: {
					id: req.user.id
				}
			}
		})

		if (existingUser) {
			return res.status(409).json({
				message: 'Этот email уже занят'
			})
		}

		const updatedUser = await prisma.user.update({
			where: { id: req.user.id },
			data: {
				name,
				email,
				age: age === '' || age === null ? null : Number(age),
				weight: weight === '' || weight === null ? null : Number(weight),
				height: height === '' || height === null ? null : Number(height),
				goal: goal === '' ? null : goal
			},
			select: {
				id: true,
				name: true,
				email: true,
				age: true,
				weight: true,
				height: true,
				goal: true,
				createdAt: true
			}
		})

		return res.json({
			message: 'Профиль обновлён',
			user: updatedUser
		})
	} catch (error) {
		console.error('Update me error:', error)
		return res.status(500).json({
			message: 'Ошибка сервера'
		})
	}
}

export const deleteMe = async (req, res) => {
	try {
		const userId = req.user.id

		await prisma.mealEntry.deleteMany({
			where: { userId }
		})

		await prisma.user.delete({
			where: { id: userId }
		})

		return res.json({ message: 'Аккаунт удалён' })
	} catch (error) {
		console.error('Delete user error:', error)
		return res.status(500).json({
			message: 'Ошибка удаления аккаунта'
		})
	}
}
