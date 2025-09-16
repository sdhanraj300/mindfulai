import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createChain } from "@/lib/chat/llm";
import { retrieveContext } from "@/lib/chat/rag";
import {
  type ChatRecord,
  ensureChatTitle,
  persistAssistantMessage,
  persistUserMessage,
  resolveOrCreateConversation,
} from "@/lib/chat/conversation";
import { formatMessage } from "@/lib/utils";
import type { IncomingChatMessage } from "@/types/chat";
import { ChatBodySchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const conversationIdFromQuery =
      url.searchParams.get("conversationId") || undefined;
    const tz = req.headers.get("x-tz") || "UTC";

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const dbUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });
    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found. Please sign out and sign in again." },
        { status: 409 }
      );
    }

    const parsed = ChatBodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { messages } = parsed.data as { messages: IncomingChatMessage[] };

    const currentMessageContent = messages[messages.length - 1].content;
    const previousMessages = messages.slice(0, -1).map(formatMessage);
    const chatHistoryString = previousMessages
      .map((msg) =>
        msg._getType() === "human"
          ? `User: ${msg.content}`
          : `Assistant: ${msg.content}`
      )
      .join("\n");

    let chatRecord: ChatRecord;
    try {
      chatRecord = await resolveOrCreateConversation(
        session.user.id,
        conversationIdFromQuery || undefined,
        tz
      );
    } catch {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    await persistUserMessage(chatRecord.id, currentMessageContent);
    chatRecord = await ensureChatTitle(chatRecord, currentMessageContent);

    const context = await retrieveContext(currentMessageContent, 5);

    const chain = createChain();

    const stream = await chain.stream({
      context: context,
      chat_history: chatHistoryString,
      question: currentMessageContent,
    });

    const encoder = new TextEncoder();
    let assistantText = "";
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            assistantText += chunk;
            controller.enqueue(encoder.encode(chunk));
          }
          await persistAssistantMessage(chatRecord!.id, assistantText);
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "x-conversation-id": chatRecord.id,
        "x-date-bucket": chatRecord.dateBucket,
      },
    });
  } catch (err) {
    let errorMsg = "Unknown error";
    if (err instanceof Error) {
      errorMsg = err.message;
    }
    console.error("API Error:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
