import express from "express";
import { register } from "../Controllers/userController.js";
import { validateRegistration } from "../Validators/userValidator.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, register);

export default userRouter;
