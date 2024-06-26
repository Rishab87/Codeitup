import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker2";

const startWorker = async()=>{
    await connectRedis();
    await connectRedisQueue();
    await worker();
}

startWorker();