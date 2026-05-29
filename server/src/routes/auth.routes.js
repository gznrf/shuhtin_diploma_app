import { Router } from 'express'
import {
	deleteMe,
	getMe,
	login,
	register,
	updateMe
} from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.patch('/me', authMiddleware, updateMe)
router.delete('/me', authMiddleware, deleteMe)

export default router
