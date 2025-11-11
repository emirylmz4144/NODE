import { client } from "../db/connection.js";

class TaskModel {
    static async getAllTasks() {
        const result = await client.query
            (
                `
                select 
                    tasks.id,
                    tasks.user_id,
                    tasks.text,
                    tasks.completed,
                    tasks.created_at,
                    tasks.updated_at,
                    users.username
                from tasks
                inner join users on tasks.user_id=users.id
                order by tasks.id asc
                `
            )


        return result.rows.map((returnValue) => {
            return {
                ...returnValue,
                created_at: TaskModel.formatDate(returnValue.created_at),
                updated_at: TaskModel.formatDate(returnValue.updated_at)
            }
        })
    }

    static async getTaskById(id) {
        const result = await client.query
        (
            `
              select
                    tasks.id,
                    tasks.user_id,
                    tasks.text,
                    tasks.completed,
                    tasks.created_at,
                    tasks.updated_at,
                    users.username
              from tasks
              inner join
                     users ON tasks.user_id = users.id
              WHERE tasks.id = $1
            `,
            [id]
        );

        const data = result.rows[0];
        if (!data) return null;

        return {
            ...data,
            created_at: TaskModel.formatDate(data.created_at),
            updated_at: TaskModel.formatDate(data.updated_at),
        };
    }

    static async createTask(user_id,text,completed=false){
        const result=await client.query
        (
            `
              insert into
                 tasks (user_id, text, completed)
              values ($1, $2, $3)
              returning *
            `,
            [user_id,text,completed]
        )

        const row=result.rows[0]
        return {
            ...row,
            created_at:TaskModel.formatDate(row.created_at),
            updated_at:TaskModel.formatDate(row.updated_at)
        }
    }

    static async updateTask(id,text,completed){
        const result=await client.query
        (
            `
                update tasks
                    set text=$1 , completed=$2
                where id = $3
                returning *

            `,
            [text,completed,id]
        )
        const row =result.rows[0]
        if(!row)return null

        return {
            ...row,
            created_at:TaskModel.formatDate(row.created_at),
            updated_at:TaskModel.formatDate(row.updated_at)
        }
            
        
    }

    static async deleteTask(id){
        
        const result=await client.query
        (
            `
                delete from tasks 
                where id=$1
                returning *
            `,[id]
        )
        return result.rows[0]
    }
    static formatDate(date) {
        /* 
         padStart() metodu gelen tek karakterli tarihleri belirtilen kadar
         karaktere getirir ve başına istediğimiz ekletir
         1.1.2025-->01.01.2025
        */

        const dateFormat = new Date(date);
        const day = String(dateFormat.getDate()).padStart(2, "0");
        const month = String(dateFormat.getMonth() + 1).padStart(2, "0");
        const year = dateFormat.getFullYear();
        const hours = String(dateFormat.getHours()).padStart(2, "0");
        const minutes = String(dateFormat.getMinutes()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
}

export default TaskModel