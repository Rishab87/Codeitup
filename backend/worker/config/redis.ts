import {createClient} from 'redis';
import dotenv from 'dotenv';
dotenv.config();

export const redisClient = createClient({
    url: process.env.REDIS_HOST
});

export const redisQueueClient = createClient({
    url: process.env.REDIS_QUEUE
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

export const connectRedisQueue  = async()=>{
    try{
        await redisQueueClient.connect();
        console.log("Redis Queue connected");
    } catch(error){
        console.log(error);
    }
}
