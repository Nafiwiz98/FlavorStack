import express from "express";
import { register } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/register", register);

export default userRouter;
