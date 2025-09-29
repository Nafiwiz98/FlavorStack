import User from "../Models/User";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "Email already exists" });
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.json(201).json({ message: "Registered successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
