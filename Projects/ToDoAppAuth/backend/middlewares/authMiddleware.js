import jwt from "jsonwebtoken"
const authanticeToken = async (req, res, next) => {
    const token=req.headers["authorization"].split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "Yetkisiz erişim" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = { id: decoded.id, username: decoded.username }
    next()
}


export { authanticeToken }