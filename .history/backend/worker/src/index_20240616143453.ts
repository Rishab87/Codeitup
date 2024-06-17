import {connectRedis, connectRedisQueue } from "../config/redis";
import {worker} from "./worker";

connectRedis();
connectRedisQueue();
worker();