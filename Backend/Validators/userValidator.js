import { checkSchema, validationResult } from "express-validator";

const registrationValidationSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "username is required.",
      bail: true,
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email is required.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Please Provide valid email",
      bail: true,
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required",
      bail: true,
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
