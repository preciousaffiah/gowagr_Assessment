import { AuthController } from "@controllers";
import { validationMiddleware } from "@middlewares";
import { LoginDto,SignUpDto } from "@dtos";
import { Router } from "express";

const authRoutes = Router();
const path = '/auth';

authRoutes.post(`${path}/register`, validationMiddleware(SignUpDto), AuthController.Register);
authRoutes.post(`${path}/login`, validationMiddleware(LoginDto), AuthController.Login);

export default authRoutes;