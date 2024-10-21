import HttpException from "utils/exceptions";
import {
  TransactionRepository,
  UserRepository,
  WalletRepository,
} from "repositories";
import { UserService } from "./user";
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
  WalletOperationEnum,
} from "../types/enum";
import { generateREF } from "utils/generator";
import { WalletService } from "./wallet";
import { transactionData } from "@types*";

export class TransactionService {
  static async transfer(transactionData: transactionData) {
    try {
      const sender = await UserService.getUserById(transactionData.senderId);
      const receiver = await UserService.getUserById(
        transactionData.recipientId
      );

      if (!receiver || !sender)
        throw new HttpException(404, "Sender or receiver not found");

      if (!sender.wallet || !receiver.wallet) {
        throw new HttpException(400, "User does not have a wallet");
      }

      if (sender.wallet.balance < transactionData.amount) {
        throw new HttpException(400, "Insufficient funds");
      }

      const initiatedTransactionRef = `REF${generateREF()}`;

      // Initiate transaction
      // minus and add to wallet
      // update transaction
      // create recipient transaction

      const decrementSender = await WalletService.updateWalletBalance(
        sender.userId,
        sender.wallet.walletId,
        transactionData.amount,
        WalletOperationEnum.DECREMENT
      );
      const incrementRecipient = await WalletService.updateWalletBalance(
        receiver.userId,
        receiver.wallet?.walletId,
        transactionData.amount,
        WalletOperationEnum.INCREMENT
      );

      const senderTransaction =
        await TransactionRepository.updateTransactionStatus(
          initiatedTransactionRef,
          TransactionStatusEnum.SUCCESSFULL
        );

      const recipientTransactionData = {
        amount: transactionData.amount,
        type: TransactionTypeEnum.CREDIT,
        description: transactionData.description,
        status: TransactionStatusEnum.SUCCESSFULL,
        recipientWalletId: transactionData.recipientWalletId,
        senderWalletId: transactionData.senderWalletId,
        refrence: `REF${generateREF()}`,
      };

      const recipientTransaction =
        await TransactionRepository.createTransaction(recipientTransactionData);

      return senderTransaction;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
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
      const user = await UserService.getUserById(userId);

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

      return transactions;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
