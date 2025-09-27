import express from "express";
import { connectDb } from "./Config/db.js";

const app = express();

app.get("/", (req, res) => {
  res.json("Building backend for Flavor-Stack");
});

try {
  await connectDb();
  app.listen(4000, () => {
    console.log("server listening on http://localhost:4000");
  });
} catch (error) {
  console.log("Error happened", error);
}
