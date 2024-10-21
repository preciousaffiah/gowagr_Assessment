import { Wallet } from "@prisma/client";
import { WalletOperationEnum } from "types/enum";
import prisma from "utils/database";

export class WalletRepository {
  static async createWallet(userId: string): Promise<Wallet | null> {
    const newWallet = await prisma.wallet.create({
      data: {
        userId,
      },
    });

    return newWallet;
  }

  static async getWalletbyId(walletId: string): Promise<Wallet | null> {
    const newWallet = await prisma.wallet.findUnique({
      where: {
        walletId,
      },
    });

    return newWallet;
  }

  static async updateWalletBalance(userId: string, amount: number, operation: WalletOperationEnum): Promise<Wallet | null> {
    const updatedBalance = await prisma.wallet.update({
      where: {
        userId
      },
      data: { balance: { [operation]: amount} },
    });

    return updatedBalance;
  }
}
