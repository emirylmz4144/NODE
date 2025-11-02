import express from 'express'
import cors from 'cors'
import '../backend/db/connection.js'
import { router } from './routes/taskRoutes.js'

const PORT=process.env.PORT

const app=express()

app.use(cors())
app.use(express.json())
app.use("/api/tasks",router)

app.listen(PORT,()=>{
    console.log(`Server şu an ${PORT} portunda çalışıyor`)
})