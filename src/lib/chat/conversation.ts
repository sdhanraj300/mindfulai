import { db } from "@/lib/db";
import dayjs from "@/lib/dayjs";

export type ChatRecord = {
  id: string;
  dateBucket: string;
  title: string | null;
};

export async function resolveOrCreateConversation(
  userId: string,
  conversationId: string | undefined,
  tz: string
): Promise<ChatRecord> {
  const todayBucket = dayjs().tz(tz).format("YYYY-MM-DD");

  if (conversationId) {
    const chat = await db.chat.findFirst({
      where: { id: conversationId, userId },
      select: { id: true, dateBucket: true, title: true },
    });
    if (!chat) throw new Error("Conversation not found");
    return chat;
  }

  const existing = await db.chat.findFirst({
    where: { userId, dateBucket: todayBucket },
    orderBy: { seq: "desc" },
    select: { id: true, dateBucket: true, title: true },
  });
  if (existing) return existing;

  const created = await db.chat.create({
    data: { userId, title: null, dateBucket: todayBucket },
    select: { id: true, dateBucket: true, title: true },
  });
  return created;
}

export async function persistUserMessage(chatId: string, message: string) {
  await db.message.create({
    data: { chatId, sender: "user", message },
  });
}

export async function persistAssistantMessage(chatId: string, message: string) {
  await db.message.create({
    data: { chatId, sender: "assistant", message },
  });
}

export async function ensureChatTitle(
  chat: ChatRecord,
  fromText: string
): Promise<ChatRecord> {
  if (chat.title) return chat;
  const { generateTitleFromMessage } = await import("@/lib/chat/llm");
  const title = await generateTitleFromMessage(fromText);
  await db.chat.update({ where: { id: chat.id }, data: { title } });
  return { ...chat, title };
}
