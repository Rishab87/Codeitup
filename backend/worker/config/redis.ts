import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const redisClient = redis.createClient({
    url: process.env.REDIS_HOST
});

export const connectRedis  = async()=>{
    try{
        await redisClient.connect();
        console.log("Redis connected");

    } catch(error){
        console.log(error);
        process.exit(1);
    }
}