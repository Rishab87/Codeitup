import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker";

const startWorker = async()=>{
    
}
connectRedis();
connectRedisQueue();
worker();