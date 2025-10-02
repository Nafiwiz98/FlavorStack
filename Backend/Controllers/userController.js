import { hashPassword } from "../Middlewares/hashPassword.js";
import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../Utils/generateToken.js";

//registration handler
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    const userDataForFrontend = {
      username: savedUser.username,
      email: savedUser.email,
    };
    const token = generateToken(userDataForFrontend);
    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Registered successfully",
      data: userDataForFrontend,
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error });
  }
};

//login handler
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "User by this email does not exist.",
      });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch == false)
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message: "Invalid Password try again.",
      });
    const sanitizedUserData = {
      username: existingUser.username,
      email: existingUser.email,
    };
    const token = generateToken(sanitizedUserData);
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      message: "Login successful",
      data: sanitizedUserData,
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error });
  }
};

export const home = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({
      status: "success",
      message: `Here is your dashboard ${req.user.username}`,
    });
};
