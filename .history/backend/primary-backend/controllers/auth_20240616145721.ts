import { Request, Response } from "express"
import { z } from "zod"
import prisma from "../config/prismaClient";
import otpGenerator from 'otp-generator';
<<<<<<< HEAD
import {redisQueueClient} from '../config/redisClient';
=======
import {redisClient} from '../config/redisClient';
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
import {mailSender} from '../utils/mailSender';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD
const setOTP = async(email:string, otp:string, expirySeconds:number) => {
    await redisQueueClient.set(email, otp , {EX:300});
=======
const setOTP = (email:string, otp:string, expirySeconds:number) => {
    redisClient.setEx(`otp:${email}`, expirySeconds, otp);
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
};

export const sendOTP = async(req:Request, res: Response)=>{
    try{

        const sendOTPSchema = z.object({
            email: z.string().email()
        });

        const zodValidation = sendOTPSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }
<<<<<<< HEAD
        const {email} = req.body;

        const user = await prisma.user.findFirst({
            where:{
                email,
            }
        });

        if(user){
            return res.status(400).json({message: "User already exists , please login" , success:false});
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false  , lowerCaseAlphabets: false});
        await setOTP(email, otp, 300);

        await mailSender(email, "OTP for Codeitup", `Your OTP is ${otp}`);

        return res.status(201).json({message: "OTP sent successfully" , success:true});

    } catch(error){
        return res.status(500).json({error: (error as Error).message , success: false , message:"Internal server error"})
=======

        const {email} = req.body;
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false  , lowerCaseAlphabets: false});
        setOTP(email, otp, 300);

        await mailSender(email, "OTP for Codeitup", `Your OTP is ${otp}`);

        return res.status(201).json({message: "OTP sent successfully"})

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
    }
}


export const signup = async(req:Request, res: Response)=>{
    try{

        const signupSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6).refine((password) => {
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSynbol = /[^A-Za-z0-9]/.test(password);
            
                return hasUpperCase && hasLowerCase && hasNumber && hasSynbol;
              }, {
                message: "Password must contain at least one uppercase ,  one lowercase letter , one number and one symbol."
              }),
<<<<<<< HEAD
            confirmPassword: z.string().min(6),
            firstName: z.string(),
            lastName: z.string(),
            username: z.string(),
            otp: z.string().length(6),
=======
            firstName: z.string(),
            lastName: z.string(),
            username: z.string(),
            otp: z.string().length(6)
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        })
        
        const zodValidation = signupSchema.safeParse(req.body);

        if(!zodValidation.success){
<<<<<<< HEAD
            return res.status(400).json({error: zodValidation.error , success:false})
        }

        const {email, password , firstName , lastName , username , confirmPassword , otp} = req.body;
        console.log(req.body);
        
=======
            return res.status(400).json({error: zodValidation.error})
        }

        const {email, password , firstName , lastName , username , otp} = req.body;
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac

        const user  = await prisma.user.findFirst({
            where:{
                username,
            }
        })

        if(user){
<<<<<<< HEAD
            return res.status(400).json({error: "Username already exists" , success:false})
=======
            return res.status(400).json({error: "Username already exists"})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        }

        const userByEmail = await prisma.user.findFirst({
            where:{
                email
            }
        });

<<<<<<< HEAD
        if(confirmPassword !== password){
            return res.status(400).json({error: "Password and confirm password do not match" , success:false})
        }

        if(userByEmail){
            return res.status(400).json({error: "Email already exists" , success:false})
        }

        const otpFromRedis = await redisQueueClient.get(email);
        console.log(otpFromRedis , otp);
        

        if(otpFromRedis !== otp){
            return res.status(400).json({message: "Invalid OTP" , success:false})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
=======
        if(userByEmail){
            return res.status(400).json({error: "Email already exists"})
        }

        const otpFromRedis = await redisClient.get(email);

        if(otpFromRedis !== otp){
            return res.status(400).json({message: "Invalid OTP"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        const newUser = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                firstName,
                lastName,
                username,
                image: `https://api.dicebear.com/8.x/thumbs/svg?seed=${username}`,
            }
        });

        newUser.password = "undefined";

<<<<<<< HEAD
        return res.status(201).json({message: "User created successfully", data: newUser , success:true});

    } catch(error){
        console.log(error);
        return res.status(500).json({error: (error as Error).message , success:false})
=======
        return res.status(201).json({message: "User created successfully", data: newUser})

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
    }
}

export const login = async(req:Request, res: Response)=>{
    try{
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const zodValidation = loginSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }

        const {email, password} = req.body;

        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            return res.status(400).json({message: "User does not exists"})
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string);
<<<<<<< HEAD
        const date = new Date();
        res.cookie('token', token, { httpOnly: true, expires: new Date(date.getTime() + 365* 24 * 60 * 60 * 1000) ,  secure: process.env.NODE_ENV === 'production' });
=======
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        user.password = "undefined";

        await prisma.user.update({
            where:{
                id: user.id,
            },
            data:{
                token: token,
            }
        });
<<<<<<< HEAD
        
=======
        //verify token ki ussi user ka new token hai when user tries to login thu tokenAPI path
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        return res.status(200).json({message: "User logged in successfully", data: user , token,});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const changePassword = async(req:Request, res: Response)=>{
    try{

        const changePasswordSchema = z.object({
            password: z.string().min(6),
            newPassword: z.string().min(6),
        });

        const zodValidation = changePasswordSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }

        const {password , newPassword} = req.body;  

        const user = await prisma.user.findFirst({
            where:{
                id: req.body.userId
            }
        });

        if(!user){
            return res.status(400).json({message: "User does not exists"})
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({message: "Invalid password"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where:{
                id: req.body.userId
            },
            data:{
                password: hashedPassword
            }
        });

        return res.status(201).json({message: "Password changed successfully"})

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const forgotPasswordToken = async(req:Request, res: Response)=>{
    try{

        const forgotPasswordTokenSchema = z.object({
            email: z.string().email()
        });

        const zodValidation = forgotPasswordTokenSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }

        const {email} = req.body;

        const user = await prisma.user.findFirst({
            where:{
                email
            }
        });

        if(!user){
            return res.status(400).json({message: "User does not exists"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET as string, {expiresIn: "5m"});
        await mailSender(email, "Forgot Password", `Click on the link to reset password http://localhost:3000/reset-password/${token}`);
        return res.status(201).json({message: "Link sent successfully"});
        
    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}

export const forgotPassword = async(req:Request, res: Response)=>{
    try{

        const forgotPasswordSchema = z.object({
            email: z.string().email(),
            newPassword: z.string().min(6),
            token: z.string().length(6)
        });

        const zodValidation = forgotPasswordSchema.safeParse(req.body);

        if(!zodValidation.success){
            return res.status(400).json({error: zodValidation.error})
        }

        const {email , newPassword , token} = req.body;
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        }
        catch(error){
            return res.status(400).json({message: "token expired"});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where:{
                email
            },
            data:{
                password: hashedPassword
            }
        });

        return res.status(201).json({message: "Password changed successfully"});

    } catch(error){
        return res.status(500).json({error: (error as Error).message})
    }
}