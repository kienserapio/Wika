import { NextResponse } from "next/server";
import { IsAdmin } from "@/lib/admin";
import db from "@/db/drizzle"
import { lessons } from "@/db/schema";

export const GET = async () => {
    if (await !IsAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await db.query.lessons.findMany();
    
    return NextResponse.json(data);
};

export const POST = async (req: Request) => {
    if (await !IsAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const data = await db.insert(lessons).values({
        ...body,
    }).returning();
    
    return NextResponse.json(data[0]);
}
