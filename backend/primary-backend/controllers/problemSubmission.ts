import {Request, Response} from 'express';
import { redisClient } from '../config/redisClient';
import {z} from 'zod';

export const submitProblem = async(req:Request, res: Response)=>{
    try{

        const submitProblemSchema = z.object({
            questionId: z.string(),
            code: z.string(),
            language: z.string(),
        });

        const zodValidation = submitProblemSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }

        const {questionId , code , language} = req.body;
        const {userId} = req.body;

        const problemSubmission = {
            questionId,
            code,
            language,
            userId
        }

        await redisClient.lPush("submissions", JSON.stringify(problemSubmission));

        res.json({
            message: "Problem submitted successfully"
        });

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}