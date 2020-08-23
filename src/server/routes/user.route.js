import express from "express";
import { getUserDetails } from "../controllers/user.controller";
export const userRouter = express.Router();

userRouter.get("/:username", getUserDetails);
