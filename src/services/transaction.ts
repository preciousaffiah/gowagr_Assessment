import { UserService } from "@services";
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  WalletOperationEnum,
} from "../types/enum";
import { WalletService } from "./wallet";
import { transactionData } from "@types*";
import { TransactionRepository } from "@repositories";
import { HttpException, generateREF, prisma } from "@utils";

export class TransactionService {
  static async transfer(transactionData: transactionData) {
    return await prisma.$transaction(async (prisma) => {
      try {
        const sender = await UserService.getUserById(transactionData.senderId);
        const receiver = await UserService.getUserById(
          transactionData.recipientId
        );

        if (transactionData.recipientId === transactionData.senderId) {
          throw new HttpException(400, "You cannot send money to youself");
        }

        if (!sender.wallet || !receiver.wallet) {
          throw new HttpException(400, "User does not have a wallet");
        }

        if (sender.wallet.balance < transactionData.amount) {
          throw new HttpException(400, "Insufficient funds");
        }

        const initiatedTransactionRef = `TRF${generateREF()}`;

        const senderTransactionData = {
          amount: transactionData.amount,
          type: TransactionTypeEnum.DEBIT,
          description: transactionData.description,
          recipientWalletId: receiver.wallet.walletId,
          senderWalletId: sender.wallet.walletId,
          refrence: initiatedTransactionRef,
        };
        const senderTransaction = await TransactionRepository.createTransaction(
          senderTransactionData
        );

        const decrementSender = await WalletService.updateWalletBalance(
          sender.wallet.walletId,
          transactionData.amount,
          WalletOperationEnum.DECREMENT
        );
        const incrementRecipient = await WalletService.updateWalletBalance(
          receiver.wallet?.walletId,
          transactionData.amount,
          WalletOperationEnum.INCREMENT
        );

        const updateSenderTransaction =
          await TransactionService.updateTransactionStatus(
            senderTransaction?.transactionId as string,
            TransactionStatusEnum.SUCCESSFULL
          );

        const recipientTransactionData = {
          amount: transactionData.amount,
          type: TransactionTypeEnum.CREDIT,
          description: transactionData.description,
          status: TransactionStatusEnum.SUCCESSFULL,
          recipientWalletId: receiver.wallet.walletId,
          senderWalletId: sender.wallet.walletId,
          refrence: `TRF${generateREF()}`,
        };

        const recipientTransaction =
          await TransactionRepository.createTransaction(
            recipientTransactionData
          );

        return updateSenderTransaction;
      } catch (error: any) {
        throw new HttpException(error.status, error.message);
      }
    });
  }

  static async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatusEnum
  ) {
    try {
      const transaction = await TransactionRepository.getTrnsactionById(
        transactionId
      );

      if (!transaction) {
        throw new HttpException(404, "Transaction not found");
      }
      const updatedTransaction =
        await TransactionRepository.updateTransactionStatus(
          transactionId,
          status
        );

      return updatedTransaction;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async getUserTransactionHistory(
    userId: string,
    page: number,
    pageSize: number,
    date: Date
  ) {
    try {
      const wallet = await WalletService.getWalletbyUserId(userId);

      if (!wallet) {
        throw new HttpException(404, "User wallet not found");
      }

      const transactions =
        await TransactionRepository.getUserTransactionHistory(
          wallet.walletId,
          page,
          pageSize,
          date
        );

      return { transactions, page: page, pageSize: pageSize };
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
