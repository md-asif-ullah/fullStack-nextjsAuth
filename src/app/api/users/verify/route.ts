import connected from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

connected();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = reqBody.token;

        if (!token) {
            return NextResponse.json(
                { message: "Token not found" },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            varificationToken: token,
            varificationExpire: { $gt: Date.now() },
        }).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "unauthorized access" },
                { status: 401 }
            );
        }

        user.isVarified = true;
        user.varificationToken = undefined;
        user.varificationExpire = undefined;

        await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
