import { Request, Response } from "express";
import { APIResponse } from "@utils";
import { TransactionService } from "@services";

export class TransactionController {
  static async transfer(req: Request, res: Response) {
    try {
      const transactionData = req.body;

      //@ts-ignore
      transactionData.senderId = req.user.userId;

      const newTransaction = await TransactionService.transfer(transactionData);
      return APIResponse.success(res, newTransaction, 200, "New transaction.");
    } catch (error: any) {
      console.log(error);
      return APIResponse.error(res, error);
    }
  }

  static async getUserTransactionHistory(req: Request, res: Response) {
    try {
      //@ts-ignore
      const userId = req.user.userId;

      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const date = req.body.date || new Date();

      const newTransaction = await TransactionService.getUserTransactionHistory(
        userId,
        page,
        pageSize,
        date
      );
      return APIResponse.success(res, newTransaction, 200, "New transaction.");
    } catch (error: any) {
      console.log(error);
      return APIResponse.error(res, error);
    }
  }
}
