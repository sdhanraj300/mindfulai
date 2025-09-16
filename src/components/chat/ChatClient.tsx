"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import ChatFooter from "@/components/chat/ChatFooter"
import ChatHeader from "@/components/chat/ChatHeader"
import ChatSection from "@/components/chat/ChatSection"
import { Sidebar } from "@/components/Sidebar"
import { useChat } from "@/hooks/use-chat"

export interface ChatClientProps {
    currentUser: {
        name: string
        avatar: string
    }
}

const ChatClient: React.FC<ChatClientProps> = ({ currentUser }) => {
    const {
        messages,
        loading,
        input,
        setInput,
        inputRef,
        conversationId,
        handleSend,
        handlePromptClick,
        loadMessagesFor,
        newConversation,
    } = useChat()
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
        <div className="relative h-screen w-full dark:bg-primary-dark transition-colors">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                currentUser={currentUser}
                selectedConversationId={conversationId}
                onSelectConversation={(id) => loadMessagesFor(id)}
            />
            <div className="flex h-screen">
                {/* Left rail is now part of global Sidebar; no second sidebar */}
                <Card className="flex font-mono flex-col h-screen w-full max-w-3xl mx-auto rounded-2xl shadow-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
                    <ChatHeader
                        onMenuClick={() => setSidebarOpen(true)}
                        onNewChat={newConversation}
                    />
                    <ChatSection
                        handlePromptClick={handlePromptClick}
                        chatHistory={messages.map((m) => ({ sender: m.role === "user" ? "user" : "bot", message: m.content }))}
                        loading={loading}
                        currentUser={currentUser}
                    />
                    <ChatFooter
                        loading={loading}
                        handleSend={handleSend}
                        input={input}
                        setInput={setInput}
                        inputRef={inputRef as React.RefObject<HTMLTextAreaElement>}
                    />
                </Card>
            </div>
        </div>
    )
}

export default ChatClient
