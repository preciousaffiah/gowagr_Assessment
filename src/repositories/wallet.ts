import { Wallet } from "@prisma/client";
import { prisma } from "@utils";
import { WalletOperationEnum } from "types/enum";

export class WalletRepository {
  static async createWallet(userId: string): Promise<Wallet | null> {
    const newWallet = await prisma.wallet.create({
      data: {},
    });

    const linkUser = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        walletId: newWallet.walletId,
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

  static async updateWalletBalance(
    walletId: string,
    amount: number,
    operation: WalletOperationEnum
  ): Promise<Wallet | null> {
    const updatedBalance = await prisma.wallet.update({
      where: {
        walletId,
      },
      data: { balance: { [operation]: amount } },
    });

    return updatedBalance;
  }
}
