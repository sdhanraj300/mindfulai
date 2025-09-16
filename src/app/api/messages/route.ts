import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const dbUser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });
  if (!dbUser)
    return NextResponse.json(
      { error: "User not found. Please sign out and sign in again." },
      { status: 409 }
    );

  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");
  const cursor = url.searchParams.get("cursor") || undefined;
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);

  if (!conversationId)
    return NextResponse.json(
      { error: "conversationId required" },
      { status: 400 }
    );

  const convo = await db.chat.findFirst({
    where: { id: conversationId, userId: session.user.id },
    select: { id: true },
  });
  if (!convo)
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );

  const messages = await db.message.findMany({
    where: { chatId: conversationId },
    orderBy: { timestamp: "asc" },
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    take: limit,
    select: { id: true, sender: true, message: true, timestamp: true },
  });

  const nextCursor =
    messages.length === limit ? messages[messages.length - 1].id : null;
  return NextResponse.json({ messages, nextCursor });
}
