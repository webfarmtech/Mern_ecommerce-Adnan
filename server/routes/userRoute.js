import express from "express";
import {
  adminLogin,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetPassword.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;
