import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker";
import {worker2} from "./worker2";

const startWorker = async()=>{
    await connectRedis();
    await connectRedisQueue();
    await worker2();
}

startWorker();