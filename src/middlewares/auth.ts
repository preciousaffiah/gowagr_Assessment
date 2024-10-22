import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APIResponse } from "@utils";
import { UserService } from "@services";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return APIResponse.error(
      res,
      { message: "Missing authentication token" },
      401
    );
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as any;

    const user = await UserService.getUserById(decodedToken.user.userId);

    if (!user) {
      return APIResponse.error(
        res,
        { message: "Requesting user does not exist" },
        404
      );
    }

    // @ts-ignore
    req.user = decodedToken.user;

    next();
  } catch (error) {
    console.log(error);
    
    APIResponse.error(
      res,
      { message: "Invalid authentication token" },
      401
    );
  }
}
