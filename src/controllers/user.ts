import { Request, Response } from "express";
import { APIResponse } from "@utils";
import { UserService } from "@services";

export class UserController {
  static async getUserById(req: Request, res: Response) {
    try {
      //@ts-ignore
      const userId = req.params.id;

      const newUser = await UserService.getUserById(userId);
      return APIResponse.success(res, newUser, 200, "User profile.");
    } catch (error: any) {
      console.log(error);
      return APIResponse.error(res, error);
    }
  }

  static async getUserByUsername(req: Request, res: Response) {
    try {
      //@ts-ignore
      const username = req.params.username;

      const newUser = await UserService.getUserByUsername(username);
      return APIResponse.success(res, newUser, 200, "User profile.");
    } catch (error: any) {
      console.log(error);
      return APIResponse.error(res, error);
    }
  }
}
