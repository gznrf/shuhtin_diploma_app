import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
