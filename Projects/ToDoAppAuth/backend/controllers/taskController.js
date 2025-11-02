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

        if (!task) {
            res.status(404).json({ message: "Aradığınız görev bulunamadı veya silindi" })
            return
        }
        res.status(200).json(task)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Sunucudan hatası kaynaklı görev görünemiyor" })
    }
}

const createTask = async (req, res) => {
    try {
        const user_id = req.body.user_id
        const text = req.body.text
        const completed = req.body.completed

        const newTask = await TaskModel.createTask(user_id, text, completed)
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası kaynaklı görev oluşturulamadı" })
        console.log(error)
    }
}

const updateTask = async (req, res) => {

    try {
        const taskId = req.params.id
        const taskText = req.params.text
        const taskComplated = req.params.completed

        const updateTask=await TaskModel.updateTask(taskId,taskText,taskComplated)
        if(!updateTask){
            res.status(404).json({message:"Güncellenmek istenen görev daha önce silinmiş yada bulunamadı"})
            return
        }

        res.status(200).json(updateTask)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Sunucu hatası kaynaklı dolayı görev güncellenemedi " })
    }

 
}

const deleteTask=async (req,res)=>{
    try{
        const taskId=req.params.id
        const deleteTask= await TaskModel.deleteTask(taskId)
        if(!deleteTask){
            res.status(404).json("Görev daha önce silinmiş yada yanlış id verildi")
            return
        }
        res.status(200).json({mesage:"Görev başarı ile silindi"})
    }catch(error){
        console.log(error)
        res.status(500).json("Sunucu hatası kaynalı görev silinemedi")
    }
}

export { getAllTasks, getTaskById, createTask ,updateTask ,deleteTask}