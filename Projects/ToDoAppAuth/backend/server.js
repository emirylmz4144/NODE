import express from 'express'
import cors from 'cors'
import '../backend/db/connection.js'
import {taskRouter} from './routes/taskRoutes.js'
import { authRouter } from './routes/authRoutes.js'


const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`Server şu an ${PORT} portunda çalışıyor`)
})
