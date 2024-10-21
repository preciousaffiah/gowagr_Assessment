import { Response } from "express";
import { Error } from "mongoose";
import HttpException from "./exceptions";
const { ValidationError } = Error;

export class APIResponse {
  static error(res: Response, error: any, code?: number) {
    console.log(error.stack);

    if (error instanceof ValidationError) {
      const errorMessages = Object.values(error.errors).map((e) => e.message);
      console.log(errorMessages);
      return res.status(400).json({
        data: { status: "error", message: "could not complete db action" },
      });
    } else if (error instanceof HttpException) {
      //ask shalom, jonathan and az about the use of the error handler in the index file
      return res
        .status(error.status || 400)
        .json({ message: error.message || "could not complete action" });
    } else {
      return res.status(code || error.status || 500).json({
        data: {
          status: "error",
          message: error.message || "An error occured, please try again later.",
        },
      });
    }
  }

  static success(res: Response, data: any, code: number, message?: string) {
    return res
      .status(code)
      .json({ data: { status: "success", data, message: message } });
  }
}
