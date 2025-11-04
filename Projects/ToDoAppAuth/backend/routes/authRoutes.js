import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);

/* Giriş */
authRouter.post("/login", login);

/* Profil (korumalı) */
authRouter.get("/me", authMiddleware, me);

export {authRouter };

