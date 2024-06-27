"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedisConnected = exports.connectRedisQueue = exports.connectRedis = exports.redisQueueClient = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let redisConnected = false;
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_HOST
});
exports.redisQueueClient = (0, redis_1.createClient)({
    url: process.env.REDIS_QUEUE
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisClient.connect();
        console.log("Redis connected");
        redisConnected = true;
    }
    catch (error) {
        console.log(error);
        redisConnected = false;
    }
});
exports.connectRedis = connectRedis;
const connectRedisQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisQueueClient.connect();
        console.log("Redis Queue connected");
        redisConnected = true;
    }
    catch (error) {
        console.log(error);
        redisConnected = false;
    }
});
exports.connectRedisQueue = connectRedisQueue;
const isRedisConnected = () => redisConnected;
exports.isRedisConnected = isRedisConnected;
