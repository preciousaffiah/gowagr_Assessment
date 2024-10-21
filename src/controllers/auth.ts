import { APIResponse } from "@utils";
import { Request, Response } from "express";
import { AuthService } from "services/auth";

export class AuthController {  
    static async Register(req: Request, res: Response) {
      try {
        const userData = req.body;
        const newUser = await AuthService.Register(userData);
        return APIResponse.success(res, newUser, 201, "User created.");
      } catch (error: any) {
        console.log(error);
        return APIResponse.error(res, error);
      }
    }
  
    static async Login(req: Request, res: Response) {
      try {
        const userData = req.body;
        const user = await AuthService.Login(userData);
        return APIResponse.success(res, user, 200, "User logged in.");
      } catch (error: any) {
        console.log(error);
        return APIResponse.error(res, error);
      }
    }
  }