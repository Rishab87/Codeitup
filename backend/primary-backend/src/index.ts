import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectRedis, redisClient} from '../config/redisClient';
import WebSocket from 'ws';
import { submitProblem } from '../controllers/problemSubmission';

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


//shyd await krna pdega
redisClient.subscribe('submissions' , (err, message)=>{
    if(err){
        console.error(err);
    } else{
        const {status , userId} = JSON.parse(message);
        const ws = clients.get(userId);
        if(ws){
            ws.send(JSON.stringify({status}));
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});