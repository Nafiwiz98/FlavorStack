import { hashPassword } from "../Middlewares/hashPassword.js";
import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

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
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };
    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "Registered successfully",
      data: userDataForFrontend,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error });
  }
};

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
    res.status(StatusCodes.ACCEPTED).json({
      status: "success",
      message: "Login successful",
      data: sanitizedUserData,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: error });
  }
};

// export const home = async(req, res) => {
//   res.status(StatusCodes.CONTINUE).json({status: 'success', message: `Here is your dashboard`})
// }