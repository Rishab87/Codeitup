import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectRedis, connectRedisQueue, redisClient} from '../config/redisClient';
import WebSocket from 'ws';
import prisma from '../config/prismaClient';
import authRoutes from '../routes/auth';
import problemSubmissionRoutes from '../routes/problemSubmission';
import questionRoutes from '../routes/questions';
import { SubmissionStatus } from '@prisma/client';

const app = express();
dotenv.config();
app.use(cors());
const wss = new WebSocket.Server({ port: 8080 });

app.use(express.json());
app.use(cookieParser());
connectRedis();
connectRedisQueue();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problem-submission', problemSubmissionRoutes);
app.use('/api/v1/questions', questionRoutes);

const PORT = process.env.PORT || 5000;

let clients = new Map();

wss.on('connection', function connection(ws , req) {
    console.log("CONNECTED TO WEBSOCKET");

    const userId = req.headers['user-id'];
    clients.set(userId, ws);

    //send result of problem to frontend

    ws.on('close', () => {
        clients.delete(userId);
    });
    
});

//config main jo question hoga uss hisab se input bne honge aur woh input pass h honge function main call ho rha hoga aur woh UI pe nhi dikhaonga code main add krke bhej dunga 

//first problem will submitted using submitProblem controller

//shyd await krna pdega
redisClient.subscribe('submissions' , async(message)=>{
        const {status , userId , questionId ,result , time , memory} = JSON.parse(message);
        //test cases will contain many objects with input and output key
        ////{input: , output:}
        console.log("RESULT RECIEVED");
        
        //check all test cases in worker and then update status
        //result is output which I will use in case of error or wrong answer and status is the final status of submission

        // await prisma.submissions.create({
        //     data:{
        //         status: SubmissionStatus.RUNTIME_ERROR,
        //         executedSpace: time,
        //         executedTime: memory,
        //         Question: {
        //             connect: {
        //                 id: questionId
        //             }
        //         },
        //         User: {
        //             connect: {
        //                 id: userId
        //             }
        //         }
        //     } , 
        // });

        const ws = clients.get(userId);
        if(ws){
            ws.send(JSON.stringify({status , result}));
        }
    }
);

//add editorial and comments feature

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});