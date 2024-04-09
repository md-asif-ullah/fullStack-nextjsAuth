import connected from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connected();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);

        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exist , please signup" },
                { status: 400 }
            );
        }
        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 400 }
            );
        }
        // Create token

        const token = jwt.sign(
            {
                _id: user.id,
            },
            process.env.TOKEN_SECRET!,
            { expiresIn: "1h" }
        );
        // Set cookie

        cookies().set("token", token, {
            httpOnly: true,
        });
        return NextResponse.json({
            message: "login successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
