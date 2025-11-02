import express from 'express'
import { getAllTasks,getTaskById } from '../controllers/taskController.js'

const router=express.Router()

router.get("/",getAllTasks)
router.get("/:id",getTaskById)



export {router}
