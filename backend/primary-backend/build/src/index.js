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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const redisClient_1 = require("../config/redisClient");
const ws_1 = __importDefault(require("ws"));
const prismaClient_1 = __importDefault(require("../config/prismaClient"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_1 = __importDefault(require("../routes/auth"));
const profile_1 = __importDefault(require("../routes/profile"));
const problemSubmission_1 = __importDefault(require("../routes/problemSubmission"));
const questions_1 = __importDefault(require("../routes/questions"));
const client_1 = require("@prisma/client");
const cloudinary_1 = require("../config/cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http = require('http');
const app = (0, express_1.default)();
dotenv_1.default.config();
const allowedOrigins = ['http://localhost:3000', 'https://codeitup.vercel.app'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the origin
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // If you're sending credentials
}));
app.options('*', (0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowable HTTP methods
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization'], // Headers allowed in preflight
    credentials: true, // Allow credentials (cookies, tokens, etc.)
}));
const server = http.createServer(app);
const wss = new ws_1.default.Server({ server});
const tempDir = path_1.default.join(__dirname, '/temp');
if (!fs_1.default.existsSync(tempDir)) {
    fs_1.default.mkdirSync(tempDir, { recursive: true });
}
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: tempDir,
}));
app.use((0, cookie_parser_1.default)());
(0, cloudinary_1.cloudinaryConnect)();
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/problem-submission', problemSubmission_1.default);
app.use('/api/v1/questions', questions_1.default);
app.use('/api/v1/profile', profile_1.default);
const PORT = process.env.PORT || 5000;
let clients = new Map();
wss.on('connection', function connection(ws, req) {
    ws.on('message', function incoming(message) {
        const messageString = message.toString(); // Convert the buffer to a string
        const tokenObj = JSON.parse(messageString);
        if (!tokenObj.close) {
            clients.set(tokenObj.userId, ws);
        }
        else
            clients.delete(tokenObj.userId);
    });
    //send result of problem to frontend
    ws.on('close', () => {
    });
});
//config main jo question hoga uss hisab se input bne honge aur woh input pass h honge function main call ho rha hoga aur woh UI pe nhi dikhaonga code main add krke bhej dunga 
//first problem will submitted using submitProblem controller
//shyd await krna pdega
redisClient_1.redisClient.subscribe('submissions', (message) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, userId, questionId, result, time, memory, difficulty, userCode } = JSON.parse(message);
    //test cases will contain many objects with input and output key
    ////{input: , output:}
    //minTim se zyada lga toh TLE , minTIME bhejo worker ko
    //check all test cases in worker and then update status
    //result is output which I will use in case of error or wrong answer and status is the final status of submission
    let subStatus = client_1.SubmissionStatus.ACCEPTED;
    if (status === "COMPILE TIME ERROR") {
        subStatus = client_1.SubmissionStatus.COMPILE_TIME_ERROR;
    }
    else if (status == "RUNTIME ERROR") {
        subStatus = client_1.SubmissionStatus.RUNTIME_ERROR;
    }
    else if (status == "WRONG ANSWER") {
        subStatus = client_1.SubmissionStatus.WRONG_ANSWER;
    }
    else if (status == "TIME LIMIT EXCEEDED") {
        subStatus = client_1.SubmissionStatus.TIME_LIMIT_EXCEEDED;
    }
    const roundedMemory = parseFloat(memory.toFixed(2));
    const roundedTime = parseFloat(memory.toFixed(2));
    if (subStatus === client_1.SubmissionStatus.ACCEPTED) {
        const updateData = {
            [difficulty]: {
                increment: 1,
            },
            points: {
                increment: 1,
            }
        };
        const existingAcceptedSubmissions = yield prismaClient_1.default.submissions.findMany({
            where: {
                questionId: questionId,
                userId: userId,
                status: client_1.SubmissionStatus.ACCEPTED,
            }
        });
        if (existingAcceptedSubmissions.length === 0) {
            const updatedUser = yield prismaClient_1.default.user.update({
                where: {
                    id: userId,
                },
                data: updateData,
            });
        }
    }
    yield prismaClient_1.default.submissions.create({
        data: {
            status: subStatus,
            executedSpace: roundedMemory,
            executedTime: roundedTime,
            code: userCode,
            Question: {
                connect: {
                    id: questionId
                }
            },
            User: {
                connect: {
                    id: userId
                }
            }
        },
    });
    //inc user points if easy question is easy then 1  , medium 2 , hard 3 
    //update easy hard or med question in user profile
    //handle streak cronjob chla skte hai jo har 24 hrs check kre kya user ne submit kiya hai question last 24 hrs agar haan toh kuch mt kro nhi toh streak 0
    //update streak when submitting the question check difference between last submitted and current Time if more than 24 hrs streak++;
    const ws = clients.get(userId);
    if (ws) {
        ws.send(JSON.stringify({ status, result, time: roundedTime, memory: roundedMemory }));
    }
}));
//add editorial and comments feature
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, redisClient_1.connectRedis)();
    yield (0, redisClient_1.connectRedisQueue)();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
startServer();
