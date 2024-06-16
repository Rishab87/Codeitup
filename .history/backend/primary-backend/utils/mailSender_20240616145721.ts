import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const mailSender= async(email:string , title:string , body:string)=>{
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
<<<<<<< HEAD
            port: 465,
            secure: true,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from:"Codeitup",
=======
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from:"StudyNotion",
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
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