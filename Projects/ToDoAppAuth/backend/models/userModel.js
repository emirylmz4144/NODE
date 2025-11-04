import { client } from "../db/connection";
import bcrypt from "bcrypt";

//Veri tabanı işlemleri için kullanıcı modeli

class UserModel {


    static async createUser(username,email,password){

        const hashRounds=5;
        const password_hash=await bcrypt.hash(password,hashRounds);

        const result=await client.query
        (
            `
            insert into users
                (username,email,password_hash)
                values ($1,$2,$3)
                RETURNING id, username, email, created_at, updated_at
            `,
            [username,email,password_hash]  
        )
        return result.rows[0];
    }


    static async getByEmail(email){
        const result= await client.query
        (
            `
              select id,username,email,password_hash,created_at,updated_at
              from users
              where email=$1
            `,
            [email]
        )
        return result.rows[0] || null
    }


    static async getById(id){
        const result = await client.query
        (
            `
             select id,username,email,created_at,updated_at
             from users
             where id=$1
            `,
            [id]
        )
        return result.rows[0] || null
    }

    static async existByEmail(email){
        const result= await client.query
        (
            `select * from users where email=$1`,[email]
        )

        if(result.rows.length>0) return true;
        else return false;
    }

    static async existByUsername(username){
        const result=await client.query
        (
            `select * from users where username=$1`,[username]
        )
        if(result.rows.length>0)return true;
        else return false;
    }

    static async verifyPassword(inputPassword,password_hash){
        return bcrypt.compare(inputPassword,password_hash)
    }
}

export default UserModel