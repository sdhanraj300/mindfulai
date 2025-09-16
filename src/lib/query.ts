"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatMessage } from "@/types/chat";
import {
  fetchMessages,
  createConversation,
  registerUserFetch,
  fetchConversations,
} from "@/lib/fetch";
import {
  fetchProfile,
  updateProfileFetch,
  type UpdateProfileInput,
  type UserProfile,
} from "@/lib/fetch";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { signInWithCredentialsFetch } from "@/lib/fetch";

//sign-in mutation
export function useSignInWithCredentials() {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const mutation = useMutation({
    mutationFn: signInWithCredentialsFetch,
    onSuccess: async () => {
      toast.success("Signed in successfully!");
      const session = await getSession();
      if (session?.user) {
        setUser({
          name: session.user.name,
          avatar: session.user.image,
          email: session.user.email,
        });
      }
      router.push("/chat");
      router.refresh();
    },
    onError: () => {
      toast.error("Invalid email or password. Please try again.");
    },
  });

  return {
    signInWithCredentials: mutation.mutate,
    isPending: mutation.isPending,
  };
}

// Chat queries

export function useMessagesQuery(conversationId: string | null) {
  return useQuery({
    queryKey: ["messages", conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<ChatMessage[]> =>
      fetchMessages(conversationId as string),
  });
}

export function useCreateConversationMutation() {
  return useMutation({
    mutationFn: createConversation,
  });
}

// Conversations list
export function useConversationsQuery() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations(),
  });
}

// Registration mutation
export function useRegisterUserMutation() {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUserFetch,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push(
        "/sign-in?message=Account created successfully. Please sign in."
      );
      router.refresh();
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Error creating account";
      toast.error(msg);
    },
  });
}

// Profile queries
export function useProfileQuery() {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

export function useUpdateProfileMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileFetch(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
