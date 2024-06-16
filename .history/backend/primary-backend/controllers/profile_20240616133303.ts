//edit additionalProfileInfo like skills , image , education etc
import {z} from 'zod';
import {Request, Response} from 'express';
import prisma from '../config/prismaClient';

export const checkForUsername = async(req:Request, res: Response)=>{
    try{
        
        const checkForUsernameSchema = z.object({
            username: z.string()
        });

        const zodValidation = checkForUsernameSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error , success:false,})
        }

        const {username} = req.body;

        const user = await prisma.user.findFirst({
            where:{
                username
            }
        });

        if(user){
            return res.status(200).json({message: "Username already exists" , success: false})
        }

        return res.status(200).json({message: "Username is available" , success: true})

    } catch(error){
        return res.status(500).json({error: (error as Error).message , success: false})
    }
}