import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { isFavorite } = body;

    if (typeof isFavorite !== 'boolean') {
       return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.resumeHistory.findUnique({
      where: { id }
    });

    if (!existing || existing.userId !== session.user.id) {
       return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    const record = await prisma.resumeHistory.update({
      where: { id },
      data: { isFavorite }
    });

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    console.error("Favorite PATCH Error:", err);
    return NextResponse.json({ error: "Failed to update favorite status" }, { status: 500 });
  }
}
