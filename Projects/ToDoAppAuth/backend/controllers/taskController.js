import TaskModel from "../models/taskModel.js"

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await TaskModel.getAllTasks()
        res.status(200).json(allTasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Sunucu hatası kaynaklı görevler getirilemedi" })
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id
        const task = await TaskModel.getTaskById(id)

        if(!task){
            res.status(404).json({message:"Aradığınız görev bulunamadı veya silindi"})
            return
        }
        res.status(200).json(task)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Sunucudan kaynaklı hatadan dolayı görev görünemiyor"})
    }
}

export { getAllTasks,getTaskById }