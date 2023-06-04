import { body } from "express-validator";

export const validateSignUp = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username is invalid"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword()
    .withMessage("password is not strong"),
];

export const validateSignIn = [
  body("email").notEmpty().withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
];
