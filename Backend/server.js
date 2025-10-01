import express from "express";
import { connectDb } from "./Config/db.js";
import userRouter from "./Routers/userRouter.js";
import dotenv from 'dotenv'

const app = express();
dotenv.config()
app.use(express.json())
app.use('/api/user', userRouter)

try {
  await connectDb();
  app.listen(process.env.PORT, () => {
    console.log("server listening on http://localhost:4000");
  });
} catch (error) {
  console.log("Error happened", error);
}
