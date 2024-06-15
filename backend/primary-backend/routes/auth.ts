import express from 'express';
import {signup ,login , changePassword , forgotPasswordToken , forgotPassword , sendOTP} from '../controllers/auth'
import { auth } from '../middlewares/auth';
import prisma from '../config/prismaClient';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/change-password', auth, changePassword);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/forgot-password', forgotPassword);
router.post('/send-otp', sendOTP);
router.post('/cookie-login', auth, async(req, res) => {
    try{

        const userId = req.body.userId;

        const user = await prisma.user.findFirst({
            where:{
                id: userId
            }
        });

        if(!user){
            return res.status(400).json({message: "User does not exists" , success: false})
        }
                
        if(user.token !== req.cookies.token){
            return res.status(401).json({message: "Unauthorized" , success: false})
        }

        return res.status(200).json({message: "User logged in successfully", data: user , success: true});

    } catch(error){
        return res.status(500).json({error: (error as Error).message ,  success: false});
    }
});

router.post('/expire-cookie', auth, async(req, res) => {
    try{

        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true,
        });

        res.status(200).json({message: "Cookie cleared" , success: true});

    } catch(error){
        return res.status(500).json({error: (error as Error).message ,  success: false});
    }
});

export default router;