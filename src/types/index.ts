import { Request as Req } from "express";
import { TransactionStatusEnum, TransactionTypeEnum } from "./enum";
// import { PrismaClient, TransactionTypeEnum } from '@prisma/client';

export interface Request extends Req {
  user: any;
}

export interface UserDetails {
  userId: string;
  email: string;
  username: string;
}

export interface UserDetailsWithBalance {
  userId: string;
  email: string;
  username: string;
  wallet: number;
}

export interface transactionData {
  senderId: string,
  recipientId: string,
  amount: number;
  type: TransactionTypeEnum;
  description: string;
  status: TransactionStatusEnum;
  recipientWalletId: string;
  senderWalletId: string;
  refrence: string;
}