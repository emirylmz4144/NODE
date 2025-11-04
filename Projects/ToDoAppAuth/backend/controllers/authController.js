import jwt from "jsonwebtoken";
import  UserModel  from "../models/userModel.js";


function signToken(user){
    return jwt.sign
    (
        {id:user.id,username:user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"2h"}
    )
}

const register=async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            res.status(400).json({message:"Veriler eksik yada hatalı girildi"})
            return;
        }
        if(await UserModel.existByEmail(email)){
            res.status(409).json({message:"Bu mail zaten kullanımda"});
            return;
        }
        if(await UserModel.existByUsername(username)){
            res.status(409).json({message:"Bu kullanıcı adı zaten kullanımda"});
            return;
        }

        const user=await UserModel.createUser(username,email,password);
        const token=signToken(user);

        res.status(201).json({user,token})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Sunucu hatası kaynakllı kullanıcı sisteme üye olamadı"})
    }
}

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            res.status(400).json({message:"email ve şifre alanlarıni girmek zorundasınız"})
            return;
        }

        const user=await UserModel.getByEmail(email);
        if(!user){
            res.status(401).json({message:"E-posta veya şifre hatalı"})
            return;
        }

        const passwordCheck=await UserModel.verifyPassword(password,user.password_hash);
        if(!passwordCheck){
            res.status(401).json({message:"Girdiğiniz parola hatalı"})
            return;
        }

        const temporaryUser={
            id:user.id,
            username:user.username,
            email:user.email,
            created_at:user.created_at,
            updated_at:user.updated_at
        }

        const token=signToken(temporaryUser)
        
        res.status(200).json({user:temporaryUser,token})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Sunucu hatası kaynaklı giriş yapılamadı"})
    }

}
const me=async (req,res)=>{
    try{
        const userId=req.user?.id;
        if(!userId){
            res.status(401).json({message:"Yetkisiz erişim"})
            return;
        }
        const user=await UserModel.getById(userId);
        if(!user){
            res.status(404).json({message:"Kullanıcı bulunamadı"})
            return;
        }
        res.status(200).json({user})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Sunucu hatası kaynaklı profil bilgileri getirilemedi"})    
    }
}


export {register,login,me}