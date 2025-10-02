import express from "express";
import { home, login, register } from "../Controllers/userController.js";
import { validateRegistration } from "../Validators/userValidator.js";
import { validateLogin } from "../Validators/loginValidator.js";
import { verifyToken } from "../Middlewares/VerifyToken.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, register);
userRouter.post("/login", validateLogin, login);
userRouter.get("/home", verifyToken, home);

export default userRouter;
