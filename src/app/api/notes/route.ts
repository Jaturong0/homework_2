import { db } from "@/db";
import { notes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt));

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.content?.trim()) {
      return Response.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    await db.insert(notes).values({
      content: body.content,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Insert failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    await db
      .update(notes)
      .set({
        content: body.content,
      })
      .where(eq(notes.id, body.id));

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await db
      .delete(notes)
      .where(eq(notes.id, body.id));

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}