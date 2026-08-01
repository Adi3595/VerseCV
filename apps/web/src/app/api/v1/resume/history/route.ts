import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth/server";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    // For demo purposes, if auth fails, we can fallback to a fixed test user
    // or just return empty history. Let's return empty if no auth.
    if (!session?.user) {
       return NextResponse.json({ history: [] });
    }

    const history = await prisma.resumeHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ history });
  } catch (err: any) {
    console.error("History GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { originalData, transformedData, universe } = body;

    if (!originalData || !transformedData || !universe) {
       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = await prisma.resumeHistory.create({
      data: {
        userId: session.user.id,
        originalData,
        transformedData,
        universe,
      }
    });

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    console.error("History POST Error:", err);
    return NextResponse.json({ error: "Failed to save history" }, { status: 500 });
  }
}
