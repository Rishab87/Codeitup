import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker";

const startWorker = async()=>{
    await connectRedis();
    await connectRedisQueue();
    await worker();
}
connectRedis();
connectRedisQueue();
worker();