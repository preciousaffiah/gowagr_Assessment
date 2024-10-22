import { UserRepository } from "@repositories";
import { HttpException } from "@utils";

export class UserService {
  static async getUserById(userId: string) {
    try {
      const user = await UserRepository.getUserById(userId);

      if (!user) {
        throw new HttpException(404, "User does not exist");
      }
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

  static async getUserByUsernameAuth(username: string) {
    try {
      const user = await UserRepository.getUserByUsername(username);

      return user;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  static async getUserByUsername(username: string) {
    try {
      const user = await UserRepository.getUserByUsername(username);

      if (!user) {
        throw new HttpException(404, "User does not exist");
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
