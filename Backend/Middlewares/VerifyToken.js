import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "error", message: "No toek provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "error", message: "Invalid or expired token" });
    }
    console.log(decoded)
    req.user = decoded.user;
    next();
  });
};
