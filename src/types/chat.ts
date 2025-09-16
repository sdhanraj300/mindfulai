export type ChatRole = "user" | "assistant";

export type IncomingChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export type ApiMessage = {
  id: string;
  sender: ChatRole;
  message: string;
};

export type ConversationSummary = {
  id: string;
  title: string | null;
  dateBucket: string;
  createdAt?: string;
  seq?: number;
};
