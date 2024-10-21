// import { logger } from '@/utils/logger';
import configureRedisClient from "config/redis/redis";
const redisClient = configureRedisClient();

// TODO: add logger and remove cosole.log

export default class OtpService {
  /**
   * Verifies the provided OTP for the given email.
   * email - Email address.
   * otp - OTP to verify.
   * returns Whether the OTP is valid.
   */
  static async verifyOTP(email: string, otp: string): Promise<boolean> {
    const key = `otp:${email}`;
    try {
      const storedOtp =   await redisClient.get(key);
      if (storedOtp === otp) {
        await redisClient.del(key);
        return true;
      }
    } catch (error) {
      console.log(error);
      //   logger.error('Error verifying OTP:', error);
    }
    return false;
  }

  /**
   * Stores an OTP with an expiration time for the given email.
   * Email address.
   *OTP to store.
   *Expiration time in seconds.
   */
  static async storeOTP( email: string, expiration: number, otp: string ): Promise<void> {
    const key = `otp:${email}`;
    try {
      await redisClient.setex(key, expiration, otp);
    } catch (error) {
      console.log(error);
      //   logger.error('Error storing OTP:', error);
    }
  }
}