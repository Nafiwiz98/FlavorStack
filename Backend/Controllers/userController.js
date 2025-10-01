import User from "../Models/User.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    const newUser = new User({ username, email, password });
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
