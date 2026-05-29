import { Router } from 'express'
import { getRecommendations } from '../controllers/recommendation.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getRecommendations)

export default router
