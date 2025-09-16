"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useMessagesQuery, useCreateConversationMutation } from "@/lib/query";
import { HttpError, streamChatReply } from "@/lib/fetch";
import dayjs from "@/lib/dayjs";
import type { ChatMessage } from "@/types/chat";

// Types moved to src/types/chat.ts

export interface UseChatReturn {
  messages: ChatMessage[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  handleSend: () => Promise<void>;
  handlePromptClick: (prompt: string) => void;
  loadMessagesFor: (conversationId: string) => Promise<void>;
  newConversation: () => Promise<void>;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loadMessagesFor = useCallback(
    async (id: string) => {
      setConversationId(id);
      const next = new URLSearchParams(searchParams?.toString() || "");
      next.set("c", id);
      router.push(`${pathname}?${next.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const messagesQuery = useMessagesQuery(conversationId);

  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  // Initialize conversation from URL (?c=...)
  useEffect(() => {
    const initial = searchParams?.get("c");
    if (initial && initial !== conversationId) {
      setConversationId(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const createConversationMutation = useCreateConversationMutation();

  const newConversation = useCallback(async () => {
    const data = await createConversationMutation.mutateAsync();
    setConversationId(data.conversation.id);
    setMessages([]);
    queryClient.setQueryData(["messages", data.conversation.id], []);
    const next = new URLSearchParams(searchParams?.toString() || "");
    next.set("c", data.conversation.id);
    router.push(`${pathname}?${next.toString()}`);
  }, [createConversationMutation, pathname, queryClient, router, searchParams]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      let accumulatedContent = "";
      const { conversationId: newId } = await streamChatReply({
        messages: newMessages,
        conversationId,
        tz: dayjs.tz.guess() || "UTC",
        onHeaders: (headers) => {
          const id = headers.get("x-conversation-id");
          if (id && id !== conversationId) {
            setConversationId(id);
            const next = new URLSearchParams(searchParams?.toString() || "");
            next.set("c", id);
            router.replace(`${pathname}?${next.toString()}`);
          }
        },
        onChunk: (chunk) => {
          accumulatedContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: accumulatedContent }
                : msg
            )
          );
        },
      });
      if (newId && newId !== conversationId) setConversationId(newId);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sorry, an unknown error occurred.";
      if (error instanceof HttpError) {
        if (error.status === 401) {
          const { signIn } = await import("next-auth/react");
          signIn(undefined, { callbackUrl: "/chat" });
          return;
        }
        if (error.status === 409) {
          setMessages((prev) =>
            prev.concat({
              id: crypto.randomUUID(),
              role: "assistant",
              content:
                "Session out of sync. Please sign out and sign in again.",
            })
          );
          return;
        }
      }
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: `Error: ${errorMessage}` }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  }, [
    conversationId,
    input,
    loading,
    messages,
    pathname,
    router,
    searchParams,
  ]);

  const handlePromptClick = useCallback((prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  }, []);

  return {
    messages,
    loading,
    input,
    setInput,
    inputRef,
    conversationId,
    setConversationId,
    handleSend,
    handlePromptClick,
    loadMessagesFor,
    newConversation,
  };
}
