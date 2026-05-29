import { Router } from 'express'
import { createRequest } from '../controllers/request.controller.js'

const router = Router()

router.post('/', createRequest)

export default router
