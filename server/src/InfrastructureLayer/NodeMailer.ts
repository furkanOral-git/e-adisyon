import nodemailer from "nodemailer"
import { RondomIdGenarator } from "../ApplicationLayer/Tools";
import { VertificationService } from "./VertificationService";

export class NodeMailer {


    public static SendVertificationMail(email: string, mailService: string, vertificationCode: string) {

        

        const transporter = nodemailer.createTransport({
            service: mailService,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL__PASS
            },
        })
        const mailOptions: nodemailer.SendMailOptions = {

            from: process.env.EMAIL,
            to: email,
            subject: "Email Vertification",
            text: `Merhaba ${email}`
        }
        transporter.sendMail(mailOptions).then((res) => {
            console.log("Başarılı")
        }).catch((err) => {
            console.log(err)
        })


    }
}