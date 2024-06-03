import { redisClient } from "../config/redis";
const { spawn } = require('child_process');

export async function worker(){
    try{

        while(1){
            const submission = await redisClient.brPop("submissions" , 0);
            console.log(submission);
            // Process the submission , run the code get results
            let res;

            //send the result to the user
            await redisClient.publish("submissions" , JSON.stringify(res));
        }


    } catch(error){
        console.log(error);
    }
}