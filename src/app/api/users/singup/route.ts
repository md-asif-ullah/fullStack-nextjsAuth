import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import sendMail from "@/helper/sendMain";
import connected from "@/dbConfig/dbConfig";

connected();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { name, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({
                success: false,
                message: "user already exists, please login",
            });
        }

        // // Hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        await sendMail({ email, emailType: "verify", userId: savedUser._id });

        return NextResponse.json({
            success: true,
            message: "user register successfully",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
