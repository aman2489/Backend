import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
    const {username, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{email}, {username}]
    })

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "User with this email or username already exists",
            sucess: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({username, email, password});
    await sendEmail({
        to: user.email,
        subject: "Welcome to Perplexity",
        html: ` <p>Hello ${user.username},</p>
                <p>Thank you for registering at Perplexity! We're excited to have you on board! If you have any questions or need assistance, feel free to reach out.
                </p><p>Best regards,<br>The Perplexity Team</p>`
    })

    return res.status(201).json({
        message: "User registered successfully",
        sucess: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}
