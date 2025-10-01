import { checkSchema, validationResult } from "express-validator";

const registrationValidationSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "username is required.",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email is required.",
    },
    isEmail: {
      errorMessage: "Please Provide valid email",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
});

const registrationValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    res.json({
      status: "error",
      message: "Validation failed",
      data: null,
      errors: errors.array(),
    });
  next();
};

export const validateRegistration = [
  registrationValidationSchema,
  registrationValidationResult,
];
