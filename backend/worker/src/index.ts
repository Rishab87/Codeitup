import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker2";
import express from 'express';

const app = express();

const startWorker = async()=>{
    await connectRedis();
    await connectRedisQueue();
    await worker();
}

startWorker();

app.listen(3001, () => {
    console.log("Sample port for free deployment on render :(")
});