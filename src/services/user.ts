import HttpException from "utils/exceptions";
import { UserRepository } from "repositories";

export class UserService {
  static async getUserById(userId: string) {
    try {
      const user = await UserRepository.getUserById(userId);
      return user;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      return user;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async getUserByUsername(username: string) {
    try {
      const user = await UserRepository.getUserByUsername(username);
      return user;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
