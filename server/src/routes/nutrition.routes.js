import { Router } from 'express'
import {
	analyzeMeal,
	healthCheck,
	testToken
} from '../controllers/nutrition.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/health', healthCheck)
router.get('/test', testToken)
router.post('/analyze-meal', authMiddleware, analyzeMeal)

export default router
