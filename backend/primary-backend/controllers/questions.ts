import { Request, Response } from 'express';
import prisma from '../config/prismaClient';
import {z} from 'zod';

export const getQuestionsByPage = async(req:Request, res: Response)=>{
    try{

        const {page} = req.body;

        if(!page) return res.status(400).json({message: "Page number is required"});

        const pageSize = 50;
        const skip = (parseInt(page) - 1) * pageSize;

        const questions = await prisma.question.findMany({
            skip,
            take: pageSize,
            orderBy:{
                createdAt: 'desc'
            }
        });

        console.log(questions);
        

        if(!questions) return res.status(404).json({message: "No questions found"});

        return res.status(201).json({data: questions});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const getQuestionsByTag = async(req:Request, res: Response)=>{
    try{

        const {tag} = req.body;

        if(!tag) return res.status(400).json({message: "Tag is required"});

        const questions = await prisma.question.findMany({
            where:{
                tags:{
                    some:{
                        name: tag
                    }
                }
            }
        });

        if(!questions) return res.status(404).json({message: "No questions found for this tag"});

        return res.status(201).json({data: questions});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }

}

export const getQuestionsBySearch = async(req:Request, res: Response)=>{
    try{

        const {search} = req.body;

        if(!search) return res.status(400).json({message: "Search query is required"});

        const questions = await prisma.question.findMany({
            where:{
                title:{
                    contains: search
                }
            }
        });

        if(!questions) return res.status(404).json({message: "No questions found for this search query"});

        return res.status(201).json({data: questions});


    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const getQuestionById = async(req:Request, res: Response)=>{
    try{

        const {id} = req.params;

        if(!id) return res.status(400).json({message: "Question id is required"});

        const question = await prisma.question.findFirst({
            where:{
                id
            },
            include:{
                tags: true
            }
        });

        if(!question) return res.status(404).json({message: "Question not found"});

        return res.status(201).json({data: question});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

//for admin in future
export const createQuestion = async(req:Request, res: Response)=>{
    try{
        const schema = z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            difficulty: z.string().min(1),
            tags: z.array(z.string()),
            minTime: z.number(),
            examples: z.array(z.object({
                input: z.string(),
                output: z.string()
            })),
            constraints: z.array(z.string().min(1)),
            testCases: z.array(z.object({
                input: z.string(),
                output: z.string(),
            })),
            config: z.object({
                cpp: z.string().min(1),
                javascript: z.string().min(1),
                python: z.string().min(1),
            }),
        });

        const zodValidation = schema.safeParse(req.body);

        if(zodValidation.success === false) return res.status(400).json({message: "Invalid data"});

        const {title, description, difficulty, tags , config , minTime,examples , constraints , testCases} = req.body;

        const tagsConnectOrCreate = tags.map((tag:string) => ({
            where: { name: tag },
            create: { name: tag }
        }));


        const question = await prisma.question.create({
            data:{
                title,
                description,
                difficulty,
                config: config,
                minTime,
                examples: examples,
                constraints,
                testCases: testCases,
                tags: {
                    connectOrCreate: tagsConnectOrCreate
                }
            }
        });

        return res.status(201).json({data: question});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const submitUsQuestionIdea = async(req:Request, res: Response)=>{
    try{

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}