import express from "express";
import { login, register } from "../Controllers/userController.js";
import { validateRegistration } from "../Validators/userValidator.js";
import { validateLogin } from "../Validators/loginValidator.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, register);
userRouter.post("/login", validateLogin, login);

export default userRouter;
