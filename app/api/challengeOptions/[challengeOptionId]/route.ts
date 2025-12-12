import { NextResponse } from "next/server";
import { IsAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { challengeOptionId } = await params;
    
    const data = await db.query.challengeOptions.findFirst({
      where: eq(challengeOptions.id, parseInt(challengeOptionId)),
    });

    if (!data) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[COURSE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { challengeOptionId } = await params;
    const body = await req.json();

    const data = await db
      .update(challengeOptions)
      .set({
        ...body,
      })
      .where(eq(challengeOptions.id, parseInt(challengeOptionId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ challengeOptionId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { challengeOptionId } = await params;

    const data = await db
      .delete(challengeOptions)
      .where(eq(challengeOptions.id, parseInt(challengeOptionId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}