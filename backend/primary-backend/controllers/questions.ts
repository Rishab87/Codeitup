import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export const getQuestionsByPage = async(req:Request, res: Response)=>{
    try{
        //use pagination fetch 50 at a time
        const {page} = req.query as {page: string};

        if(!page) return res.status(400).json({message: "Page number is required"});

        const pageSize = 50;
        const skip = (parseInt(page) - 1) * pageSize;

        const questions = prisma.question.findMany({
            skip,
            take: pageSize,
            orderBy:{
                createdAt: 'desc'
            }
        });

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

        const questions = prisma.question.findMany({
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

        const questions = prisma.question.findMany({
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

        const question = prisma.question.findFirst({
            where:{
                id
            }
        });

        if(!question) return res.status(404).json({message: "Question not found"});

        return res.status(201).json({data: question});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

//for admin in future
// export const createQuestion = async(req:Request, res: Response)=>{

// }

export const submitUsQuestionIdea = async(req:Request, res: Response)=>{
    try{

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}