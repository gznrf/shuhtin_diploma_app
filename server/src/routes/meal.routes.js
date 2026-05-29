import express from 'express'
import {
	createMeal,
	deleteMeal,
	getMealsByDate,
	getMealStats
} from '../controllers/meal.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get('/stats', authMiddleware, getMealStats)
router.post('/', authMiddleware, createMeal)
router.get('/', authMiddleware, getMealsByDate)
router.delete('/:id', authMiddleware, deleteMeal)

export default router
