import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailSender= async(email:string , title:string , body:string)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from:"StudyNotion",
            to: `${email}`, 
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
        return info;
        
    } catch(error){
        console.error(error);
    }
}