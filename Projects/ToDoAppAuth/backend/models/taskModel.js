import { client } from "../db/connection.js";

class TaskModel {

    static async getAllTasks() {
        const result = await client.query
            (`
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
            `)

        return result.rows.map((returnValue) => {
            return {
                ...returnValue,
                created_at: TaskModel.formatDate(returnValue.created_at),
                updated_at: TaskModel.formatDate(returnValue.updated_at)
            }
        })
    }

    static async getTaskById(id) {
        const result = await client.query(
            `
              SELECT
                    tasks.id,
                    tasks.user_id,
                    tasks.text,
                    tasks.completed,
                    tasks.created_at,
                    tasks.updated_at,
                    users.username
              FROM tasks
              INNER JOIN users ON tasks.user_id = users.id
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