import express from "express";

import { validateBody } from "@src/utils/validate-body";
import { validateSignUp, validateSignIn } from "./auth.validations";

import AuthController from "./auth.controller";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", validateSignUp, validateBody, AuthController.signUp);
AuthRouter.post("/signin", validateSignIn, validateBody, AuthController.signIn);
