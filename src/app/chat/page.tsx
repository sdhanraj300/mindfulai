"use client"
import type React from "react"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import ChatFooter from "@/components/chat/ChatFooter"
import ChatHeader from "@/components/chat/ChatHeader"
import ChatSection from "@/components/chat/ChatSection"
import { Sidebar } from "@/components/Sidebar"
import { useSession, signIn } from "next-auth/react"
import { Loader } from "@/components/ui/loader"
import MentalHealthTips from "@/components/chat/MentalHealthTips"
import peopleImage from "../../../public/assets/people.png"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const ChatPage: React.FC = () => {
  const {data:session,status} = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  if(status==="loading"){
    return <div className="min-w-screen min-h-screen flex justify-center items-center"><Loader variant="circular" /></div>
  }
  
  if(status==="unauthenticated"){
    signIn(undefined, { callbackUrl: '/chat' })
    return null
  }
  
  const currentUser = {
    name: session?.user?.name || "User",
    avatar: session?.user?.image || peopleImage.src
  };
  
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const assistantMessageId = crypto.randomUUID()
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.error || `Request failed with status ${response.status}`
        throw new Error(errorMessage)
      }

      if (!response.body) {
        throw new Error("No response body received")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      try {
        while (true) {
          const { done, value } = await reader.read()

          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          accumulatedContent += chunk

          // Update the assistant message with accumulated content
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: accumulatedContent } : msg)),
          )
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      const errorId = crypto.randomUUID()
      const errorMessage = error instanceof Error ? error.message : "Sorry, an unknown error occurred."
      setMessages((prev) =>
        prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: `Error: ${errorMessage}` } : msg)),
      )
    } finally {
      setLoading(false)
    }
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="relative h-screen w-full dark:bg-primary-dark transition-colors">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        currentUser={currentUser}
      />
      <div className="flex h-screen">
        <Card className="flex font-mono flex-col h-screen w-full max-w-3xl mx-auto rounded-2xl shadow-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
          <ChatHeader onMenuClick={() => setSidebarOpen(true)} />
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
        
        {/* Show tips panel when no messages */}
        {/* {messages.length === 0 && (
          <div className="w-80 p-4 hidden lg:block">
            <MentalHealthTips />
          </div>
        )} */}
      </div>
    </div>
  )
}

export default ChatPage
