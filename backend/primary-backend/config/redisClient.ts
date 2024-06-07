import {createClient} from 'redis';
import dotenv from 'dotenv';
dotenv.config();

let redisConnected:Boolean = false;

export const redisClient = createClient({
    url: process.env.REDIS_HOST
});

export const connectRedis  = async()=>{
    try{
        await redisClient.connect();
        console.log("Redis connected");
        redisConnected = true;

    } catch(error){
        console.log(error);
        redisConnected = false;
    }
}

export const isRedisConnected = ()=> redisConnected;