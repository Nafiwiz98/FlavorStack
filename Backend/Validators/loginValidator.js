import { checkSchema, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const loginValidationSchema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "please provide a valid email",
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty.",
      bail: true,
    },
  },
});

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ status: "error", message: "failed", data: errors.array() });
  next();
};

export const validateLogin = [loginValidationSchema, handleValidationResult];
