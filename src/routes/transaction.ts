import { TransactionController } from "@controllers";
import { authMiddleware, validationMiddleware } from "@middlewares";
import { TransferDto, TransferHistoryDto } from "dtos/transaction";
import { Router } from "express";

const transactionRoutes = Router();
const path = '/transaction';

transactionRoutes.post(`${path}`, authMiddleware, validationMiddleware(TransferDto), TransactionController.transfer);
transactionRoutes.post(`${path}/history`, authMiddleware, validationMiddleware(TransferHistoryDto), TransactionController.getUserTransactionHistory);

export default transactionRoutes;