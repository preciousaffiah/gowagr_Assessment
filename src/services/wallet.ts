import {HttpException} from "@utils";
import { WalletOperationEnum } from "types/enum";
import { UserRepository, WalletRepository } from "@repositories";

export class WalletService {
  static async getWalletbyId(walletId: string) {
    try {
      const wallet = await WalletRepository.getWalletbyId(walletId);

      if (!wallet) {
        throw new HttpException(404, "Wallet not found");
      }
      return wallet;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async getWalletbyUserId(userId: string) {
    try {
      const user = await UserRepository.getUserById(userId);

      if(!user) {
        throw new HttpException(404, "User not found");
      }

      if(!user.wallet) {
        throw new HttpException(404, "User wallet not found");
      }

      const wallet = await WalletRepository.getWalletbyId(user.wallet.walletId);

      if (!wallet) {
        throw new HttpException(404, "Wallet not found");
      }
      
      return wallet;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async updateWalletBalance(
    walletId: string,
    amount: number,
    operation: WalletOperationEnum
  ) {
    try {
      const wallet = await WalletRepository.getWalletbyId(walletId);

      const updatedWallet = await WalletRepository.updateWalletBalance(
        walletId,
        amount,
        operation
      );
      return updatedWallet;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
