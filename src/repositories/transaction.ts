import { Transaction } from "@prisma/client";
import { TransactionStatusEnum } from "types/enum";
import { startOfMonth, endOfMonth } from 'date-fns';
import prisma from "utils/database";

export class TransactionRepository {
  static async createTransaction(
    transactionData: any
  ): Promise<Transaction | null> {
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transactionData,
      },
    });

    return newTransaction;
  }

  static async getTrnsactionById(
    transactionId: string
  ): Promise<Transaction | null> {
    const newTransaction = await prisma.transaction.findUnique({
      where: { transactionId },
    });

    return newTransaction;
  }

  static async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatusEnum
  ): Promise<Transaction | null> {
    const newTransaction = await prisma.transaction.update({
      where: { transactionId },
      data: { status },
    });

    return newTransaction;
  }

  static async getUserTransactionHistory(
    walletId: string,
    page: number,
    pageSize: number, // Default items per page
    date?: Date
  ): Promise<Transaction[] | null> {
    const filterDate = date || new Date(); // Default to the current month if no date is provided

    // Define the start and end of the month
    const startDate = startOfMonth(filterDate);
    const endDate = endOfMonth(filterDate);

    // Calculate the pagination offsets
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch the paginated transactions
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: [{ senderWalletId: walletId }, { recipientWalletId: walletId }],
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: "desc", // Order by most recent transactions
      },
      skip,
      take,
    });

    return transactions;
  }
}
