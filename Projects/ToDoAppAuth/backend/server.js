// backend/server.js
import express from 'express'
import cors from 'cors'
import '../backend/db/connection.js'
import { router as taskRouter } from './routes/taskRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

// Auth endpointleri 
app.use('/api/auth', authRouter)

// Task endpointleri 
app.use('/api/tasks', authMiddleware, taskRouter)

app.listen(PORT, () => {
  console.log(`Server şu an ${PORT} portunda çalışıyor`)
})
