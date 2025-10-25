import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const { UPSTASH_REDIS_URL } = process.env;

const redis = new Redis(UPSTASH_REDIS_URL);

export default redis;
