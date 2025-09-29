import express from "express";
import { connectDb } from "./Config/db.js";
import userRouter from "./Routers/userRouter.js";

const app = express();
app.use('/api/user', userRouter)

try {
  await connectDb();
  app.listen(4000, () => {
    console.log("server listening on http://localhost:4000");
  });
} catch (error) {
  console.log("Error happened", error);
}
