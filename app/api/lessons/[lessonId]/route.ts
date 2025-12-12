import { NextResponse } from "next/server";
import { IsAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { lessonId } = await params;
    
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, parseInt(lessonId)),
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
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { lessonId } = await params;
    const body = await req.json();

    const data = await db
      .update(lessons)
      .set({
        title: body.title,
      })
      .where(eq(lessons.id, parseInt(lessonId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { lessonId } = await params;

    const data = await db
      .delete(lessons)
      .where(eq(lessons.id, parseInt(lessonId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}