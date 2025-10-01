import bcrypt from "bcrypt";

export const hashPassword = async (rawPassword) => {
  const saltRound = 12;
  const hashedPassword = await bcrypt.hash(rawPassword, saltRound);
  return hashedPassword;
};
