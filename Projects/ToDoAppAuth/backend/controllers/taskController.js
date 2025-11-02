import TaskModel from "../models/taskModel.js"

const getAllTasks = async (_, res) => {
    try {
        const allTasks=await TaskModel.getAllTasks()
        res.status(200).json(allTasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Sunucu hatası kaynaklı görevler getirilemedi"})
    }
}

export {getAllTasks}