import { NextResponse } from "next/server";
import { IsAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await params;
    
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, parseInt(courseId)),
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
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await params;
    const body = await req.json();

    const data = await db
      .update(courses)
      .set({
        title: body.title,
        imageSrc: body.imageSrc,
      })
      .where(eq(courses.id, parseInt(courseId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const isAdmin = await IsAdmin();
    
    if (!isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await params;

    const data = await db
      .delete(courses)
      .where(eq(courses.id, parseInt(courseId)))
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("[COURSE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}