import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModels";

async function sendMail({ email, emailType, userId }: any) {
    try {
        const hashToken = await bcrypt.hash(email, 10);

        if (emailType === "verify") {
            await User.findByIdAndUpdate(userId, {
                varificationToken: hashToken,
                varificationExpire: Date.now() + 10 * 60 * 1000,
            });
        } else if (emailType === "reset") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken,
                forgotPasswordExpire: Date.now() + 10 * 60 * 1000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "mdasifullah334@gmail.com",
                pass: "aifa gggd idho ohxn",
            },
        });

        const info = await transporter.sendMail({
            from: "mdasifullah456@gmail.com",
            to: email,
            subject:
                emailType === "verify"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verify?token=${hashToken}">here</a> to ${
                emailType === "verify"
                    ? "verify your email addedss"
                    : "reset your password"
            }
            <br/>
            ${process.env.DOMAIN}/verify?token=${hashToken}}
             </p>`,
        });
    } catch (error: any) {
        throw new Error(error);
    }
}

export default sendMail;
