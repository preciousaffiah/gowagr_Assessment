import bcrypt from "bcrypt";
import { User, Wallet } from "@prisma/client";
import prisma from "utils/database";
import { UserDetails } from "@types*";

export class UserRepository {
  static async createUser(userData: any): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: {
        ...userData,
      },
    });

    return newUser;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        email: true,
        username: true,
        fname: true,
        lname: true,
        wallet: {
          select: {
            walletId: true,
            balance: true,
          },
        },
      },
    });

    return user;
  }
  
  static async getUserByUsername(username: string): Promise<UserDetails | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        userId: true,
        email: true,
        username: true,
        fname: true,
        lname: true,
      },
    });

    return user;
  }
}
