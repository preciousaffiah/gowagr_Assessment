import Redis from 'ioredis';

let redisClientInstance: Redis | null = null;

export default function configureRedisClient() {
  if (!redisClientInstance) {
    // if (process.env.NODE_ENV === 'development') {
      redisClientInstance = new Redis({});
    // } 
    // else {
    //   redisClientInstance = new Redis(process.env.REDIS_DB as string);  
    // }
  }

  return redisClientInstance;
}