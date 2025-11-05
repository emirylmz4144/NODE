import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"

function signToken(user) {
    return jwt.sign
        (
            { id: user.id, username: user.username },
            process.env.JWT_SECRET_KEY,
        )
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            res.status(400).json({ message: "Veriler eksik girildi" })
            return
        }
        else if (await UserModel.existByEmail(email)) {
            res.status(409).json({message:"Bu emaille zaten bir kullanıcı bulunmakta"})
            return
        }
        else if (await UserModel.existByUsername(username)) {
            res.status(409).json({message:"Bu kullanıcı adı ile bir kullanıcı adı bulunmakta"})
            return
        }

        const user =await UserModel.createUser(username, email, password)
        const token = signToken(user)

        res.status(201).json({ user, token })

    } catch (error) {
        res.status(500).json({message:"Sunucu kaynaklı hatadan kayıt olunamadı"})
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ message: "Veriler eksik girildi tüm alanların belirtilmesi zorunludur" })
        return
    }

    const user = await UserModel.getByEmail(email)

    if (!user) {
        res.status(401).json({ message: "Kullanıcı bulunamadı veya bilgiler hatalı" })
        return;
    }

    const passwordCheck = await UserModel.verifyPassword(password, user.password_hash)
    if (!passwordCheck) {
        res.status(401).json({ message: "Kullanıcı şifresi yanlış" })
    }

    const assignedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    }

    
    const token=signToken(assignedUser)
    res.status(200).json({user,token})

    }catch(error){
        res.status(500).json({message:"Sunucu kaynaklı problemden dolayı giriş yapılamadı"})
    }
}

export {register,login}

