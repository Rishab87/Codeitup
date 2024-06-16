import jwt from "jsonwebtoken";
import{Request, Response, NextFunction} from "express";

interface RequestWithUser extends Request {
    userId?: any;
}

export const auth = async(req:Request, res: Response, next: NextFunction)=>{
    try{
        const token = req.cookies.token;

        if(!token){
<<<<<<< HEAD
            return res.status(401).json({message: "Unauthorized" , success:false});
=======
            return res.status(401).json({message: "Unauthorized"})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        }
        try{

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            req.body.userId = (decoded as any).id;

        } catch(error){
<<<<<<< HEAD
            return res.status(401).json({message: "Unauthorized" , success: false})
=======
            return res.status(401).json({message: "Unauthorized"})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        }
        next();
        
    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}