import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailSender= async(email:string , title:string , body:string)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from:"Codeitup",
            to: `${email}`, 
            subject: `${title}`,
            html: `${body}`,
        });
        return info;
        
    } catch(error){
    }
}