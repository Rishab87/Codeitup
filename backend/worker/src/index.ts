import {connectRedis } from "../config/redis";
import {worker} from "./worker";

connectRedis();
worker();