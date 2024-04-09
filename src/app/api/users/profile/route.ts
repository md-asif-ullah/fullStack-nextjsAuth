import connected from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connected();

export async function GET() {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "unautorize access" },
                { status: 401 }
            );
        }

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        if (!decoded) {
            return NextResponse.json(
                { message: "unautorize access" },
                { status: 401 }
            );
        }

        const user = await User.findById(decoded._id);

        if (!user) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "user found",
                user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
