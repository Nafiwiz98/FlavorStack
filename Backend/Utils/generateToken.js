import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1d" });
  return token
};
