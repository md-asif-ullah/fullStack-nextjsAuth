import connected from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connected();

export async function POST(request: NextRequest) {
    try {
        cookies().delete("token");

        return NextResponse.json({
            message: "logout successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
