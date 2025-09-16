import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import dayjs from "@/lib/dayjs";

export async function GET() {
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

  const chats = await db.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      dateBucket: true,
      seq: true,
      createdAt: true,
      updatedAt: true,
    },
    take: 200,
  });
  return NextResponse.json({ conversations: chats });
}

export async function POST(req: Request) {
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

  const tz = req.headers.get("x-tz") || "UTC";
  const todayBucket = dayjs().tz(tz).format("YYYY-MM-DD");

  // Determine next seq for today
  const lastToday = await db.chat.findFirst({
    where: { userId: session.user.id, dateBucket: todayBucket },
    orderBy: { seq: "desc" },
    select: { seq: true },
  });
  const nextSeq = (lastToday?.seq ?? 0) + 1;

  const chat = await db.chat.create({
    data: {
      userId: session.user.id,
      dateBucket: todayBucket,
      seq: nextSeq,
      title: null,
    },
    select: {
      id: true,
      title: true,
      dateBucket: true,
      seq: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ conversation: chat }, { status: 201 });
}
