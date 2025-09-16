// src/lib/fetch.ts
//sign-in functions
export interface SignInCredentials {
  email: string;
  password: string;
}
type SignInResult = { error?: string | null };

export async function signInWithCredentialsFetch({
  email,
  password,
}: SignInCredentials) {
  const { signIn } = await import("next-auth/react");
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  const r = (result ?? undefined) as SignInResult | undefined;
  if (r?.error) throw new Error(r.error || "Sign-in failed");
  return result;
}

// Chat functions
import type {
  ApiMessage,
  ChatMessage,
  ConversationSummary,
} from "@/types/chat";

export async function fetchMessages(
  conversationId: string
): Promise<ChatMessage[]> {
  const res = await fetch(
    `/api/messages?conversationId=${encodeURIComponent(conversationId)}`
  );
  if (!res.ok) throw new Error("Failed to load messages");
  const data: { messages: ApiMessage[] } = await res.json();
  return (data.messages ?? []).map((m) => ({
    id: m.id,
    role: m.sender,
    content: m.message,
  }));
}

export async function createConversation(): Promise<{
  conversation: { id: string };
}> {
  const tz = (await import("@/lib/dayjs")).default.tz.guess() || "UTC";
  const res = await fetch("/api/conversations", {
    method: "POST",
    headers: { "x-tz": tz },
  });
  if (!res.ok) throw new Error("Failed to create conversation");
  return res.json();
}

// Conversations list
export async function fetchConversations(): Promise<{
  conversations: ConversationSummary[];
}> {
  const res = await fetch("/api/conversations");
  if (!res.ok) throw new Error("Failed to load conversations");
  return res.json();
}

// Registration functions
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUserFetch(payload: RegisterPayload) {
  const { getApiUrl } = await import("@/lib/utils");
  const response = await fetch(getApiUrl("/api/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    let msg = "Failed to create account";
    try {
      const data = await response.json();
      if (data?.error) msg = data.error;
    } catch {}
    throw new Error(msg);
  }
  return response.json();
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

//stream chat functions
export interface StreamChatParams {
  messages: { id: string; role: "user" | "assistant"; content: string }[];
  conversationId?: string | null;
  tz?: string;
  onChunk: (chunk: string) => void;
  onHeaders?: (headers: Headers) => void;
}

export async function streamChatReply({
  messages,
  conversationId,
  tz,
  onChunk,
  onHeaders,
}: StreamChatParams): Promise<{ conversationId?: string }> {
  const timezone =
    tz ?? (await import("@/lib/dayjs")).default.tz.guess() ?? "UTC";
  const url = new URL("/api/chat", window.location.origin);
  if (conversationId) url.searchParams.set("conversationId", conversationId);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-tz": timezone },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    let errorMessage: string | undefined;
    try {
      const data = await response.json();
      errorMessage = data?.error;
    } catch {}
    throw new HttpError(
      response.status,
      errorMessage || `Request failed with status ${response.status}`
    );
  }

  onHeaders?.(response.headers);
  const headerConversationId =
    response.headers.get("x-conversation-id") ?? undefined;

  if (!response.body) {
    throw new Error("No response body received");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } finally {
    reader.releaseLock();
  }

  return { conversationId: headerConversationId };
}

// Profile functions
export interface UserProfile {
  name?: string | null;
  image?: string | null;
  phone?: string | null;
  location?: string | null;
  bio?: string | null;
  profession?: string | null;
  experience?: string | null;
  education?: string | null;
  skills: string[];
  email?: string | null;
}

export async function fetchProfile(): Promise<UserProfile> {
  const res = await fetch("/api/profile");
  if (!res.ok) throw new Error("Failed to load profile");
  const data = await res.json();
  return data.profile as UserProfile;
}

export interface UpdateProfileInput {
  name?: string;
  image?: string;
  phone?: string;
  location?: string;
  bio?: string;
  profession?: string;
  experience?: string;
  education?: string;
  skills?: string[]; // normalized list
}

export async function updateProfileFetch(payload: UpdateProfileInput) {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Failed to update profile";
    try {
      const data = await res.json();
      msg = data?.error || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
