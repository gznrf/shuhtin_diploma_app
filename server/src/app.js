import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth.routes.js'
import mealRoutes from './routes/meal.routes.js'
import nutritionRoutes from './routes/nutrition.routes.js'
import recommendationRoutes from './routes/recommendation.routes.js'
import requestRoutes from './routes/request.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/', nutritionRoutes)
app.use('/meals', mealRoutes)
app.use('/recommendations', recommendationRoutes)
app.use('/requests', requestRoutes)

export default app
