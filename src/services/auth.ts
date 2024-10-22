import bcrypt from "bcrypt";
import { UserService } from "./user";
import { HttpException, capitalizeFletter, generateJWTToken } from "@utils";
import { UserRepository, WalletRepository } from "@repositories";

export class AuthService {
  static async Register(userData: {
    email: string;
    password: string;
    mobile: string;
    fname: string;
    lname: string;
    username: string;
  }) {
    try {
      userData.username = userData.username.toLowerCase();
      userData.email = userData.email.toLowerCase();
      userData.lname = capitalizeFletter(userData.lname);
      userData.fname = capitalizeFletter(userData.fname);

      const existingEmail = await UserService.getUserByEmail(userData.email);
      if (existingEmail)
        throw new HttpException(409, "This user already exists");

      const existingUsername = await UserService.getUserByUsername(
        userData.username
      );
      if (existingUsername)
        throw new HttpException(409, "This username already exists");

      userData.password = await bcrypt.hash(userData.password, 10);

      const newUser = await UserRepository.createUser(userData);
      if (!newUser) {
        throw new HttpException(500, "could not complete database action");
      }

      // Generate JWT token
      const token = generateJWTToken(newUser);

      const wallet = await WalletRepository.createWallet(newUser.userId);
      if (!wallet) {
        throw new HttpException(500, "could not complete wallet creation");
      }

      const user = {
        userId: newUser.userId,
        username: newUser.username,
        email: newUser.email,
        balance: wallet.balance,
      };

      return { token: token, userData: user };
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async Login(userData: { email: string; password: string }) {
    try {
      const user = await UserService.getUserByEmail(
        userData.email.toLowerCase()
      );
      if (!user) throw new HttpException(404, `This user does not exist`);

      const { userId, username } = user;

      const loggedUser = {
        userId,
        username,
      };

      const passwordMatch = await bcrypt.compare(
        userData.password,
        user.password
      );

      if (!passwordMatch)
        throw new HttpException(401, `Invalid email or password`);

      // Generate JWT token
      const token = generateJWTToken(user);

      return { token: token, userData: loggedUser };
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
