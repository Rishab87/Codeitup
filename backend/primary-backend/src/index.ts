import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectRedis, redisClient} from '../config/redisClient';
import WebSocket from 'ws';
import { submitProblem } from '../controllers/problemSubmission';
import prisma from '../config/prismaClient';
import { SubmissionStatus } from '@prisma/client';

const app = express();
dotenv.config();
const wss = new WebSocket.Server({ port: 8080 });

app.use(express.json());
app.use(cookieParser());
connectRedis();

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
redisClient.subscribe('submissions' , async(err, message)=>{
    if(err){
        console.error(err);
    } else{
        const {status , userId , questionId ,result} = JSON.parse(message);
        //test cases will contain many objects with input and output key
        ////{input: , output:}

        //check all test cases in worker and then update status
        //result is output which I will use in case of error or wrong answer and status is the final status of submission

        await prisma.submissions.create({
            data:{
                status: status,
                executedSpace: 0,
                executedTime: 0,
                title: "",
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
            } , 
        });

        const ws = clients.get(userId);
        if(ws){
            ws.send(JSON.stringify({status , result}));
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});