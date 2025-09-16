"use client";
import React from "react";
import dayjs from "@/lib/dayjs";
import { Card } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useConversationsQuery } from "@/lib/query";
import { cn } from "@/lib/utils";

export type Conversation = {
    id: string;
    title: string | null;
    dateBucket: string;
    createdAt?: string;
    seq?: number;
};

export function ConversationsList({
    selectedId,
    onSelect,
}: {
    selectedId?: string | null;
    onSelect: (conversation: Conversation) => void;
}) {
    const { data, isLoading } = useConversationsQuery();
    const conversations: Conversation[] = data?.conversations ?? [];

    if (isLoading)
        return (
            <div className="p-4">
                <Loader variant="wave" />
            </div>
        );

    const tz = dayjs.tz.guess() || "UTC";
    const todayStr = dayjs().tz(tz).format("YYYY-MM-DD");
    const yestStr = dayjs().tz(tz).subtract(1, "day").format("YYYY-MM-DD");

    const withinLast7 = (bucket: string) => {
        const diffDays = dayjs().tz(tz).diff(dayjs.tz(bucket, tz), "day");
        return diffDays >= 2 && diffDays < 7;
    };

    const groups: { label: string; items: Conversation[] }[] = [
        { label: "Today", items: conversations.filter((c) => c.dateBucket === todayStr) },
        { label: "Yesterday", items: conversations.filter((c) => c.dateBucket === yestStr) },
        { label: "Last 7 Days", items: conversations.filter((c) => withinLast7(c.dateBucket)) },
        {
            label: "Earlier",
            items: conversations.filter((c) => {
                const diffDays = dayjs().tz(tz).diff(dayjs.tz(c.dateBucket, tz), "day");
                return diffDays >= 7;
            }),
        },
    ];

    return (
        <div className="space-y-3" role="listbox" aria-label="Conversations">
            {groups.map((group) => (
                <div key={group.label}>
                    {group.items.length > 0 && (
                        <div className="text-xs uppercase tracking-wide text-muted-foreground px-1 mb-1">
                            {group.label}
                        </div>
                    )}
                    <div className="space-y-2">
                        {group.items.map((c) => (
                            <Card
                                key={c.id}
                                role="option"
                                tabIndex={0}
                                aria-selected={selectedId === c.id}
                                className={cn(
                                    "group p-3 cursor-pointer rounded-xl font-medium transition-all duration-300 border",
                                    selectedId === c.id
                                        ? "bg-sidebar-accent dark:bg-slate-700/80 shadow-md border-purple-300 dark:border-purple-600 text-purple-700 dark:text-foreground"
                                        : "border-transparent hover:bg-sidebar-accent dark:hover:bg-slate-700/80 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-700 text-foreground dark:text-slate-200 hover:text-purple-600 dark:hover:text-foreground"
                                )}
                                onClick={() => onSelect(c)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") onSelect(c);
                                }}
                            >
                                <div className={cn("text-sm font-semibold truncate")}>{c.title ?? "Untitled"}</div>
                                <div className={cn("text-xs text-slate-500 dark:text-slate-400 transition-colors",
                                    selectedId === c.id ? "text-foreground dark:text-purple-300" : "group-hover:text-foreground dark:group-hover:text-purple-300"
                                )}>{c.dateBucket}</div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
            {conversations.length === 0 && (
                <div className="text-xs text-muted-foreground p-3">
                    No conversations yet. Start chatting!
                </div>
            )}
        </div>
    );
}
