import { UserController } from "@controllers";
import { authMiddleware } from "@middlewares";
import { Router } from "express";

const userRoutes = Router();
const path = '/user';

userRoutes.get(`${path}/:id`, authMiddleware, UserController.getUserById);
userRoutes.get(`${path}/:username`, authMiddleware, UserController.getUserByUsername);

export default userRoutes;