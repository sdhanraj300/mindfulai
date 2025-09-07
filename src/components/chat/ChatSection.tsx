import React, { useEffect, useRef } from 'react'
import { CardContent } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import logo from '../../../public/assets/logo.png'
import botImage from '../../../public/assets/bot.png'
import peopleImage from '../../../public/assets/people.png'
import { motion } from 'framer-motion'
import PromptSection from './PromptSection'
import Image from 'next/image'
import { Message, MessageAvatar, MessageContent } from '../ui/message'
import { cn } from '@/lib/utils'
import { ScrollButton } from '../ui/scroll-button'
import { StickToBottom } from 'use-stick-to-bottom'
import { Loader } from '../ui/loader'

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

interface ChatSectionProps {
  chatHistory: ChatMessage[];
  loading: boolean;
  handlePromptClick: (prompt: string) => void;
}

const ChatSection = ({ chatHistory, loading, handlePromptClick }: ChatSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // We'll need a ref for the scroll area's viewport for the improved UX below

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  return (
    <CardContent className="flex-1 p-0 overflow-hidden relative">
        <ScrollArea className="h-full w-full">
      <StickToBottom>
          <div className="p-4 sm:p-6">
          {chatHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-muted-foreground mt-16 flex flex-col items-center"
            >
              <Image src={logo} alt="Logo" width={100} height={100} className="rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Hello! How are you feeling today?
              </h3>
              <p className="mb-6">You can start by telling me what's on your mind.</p>
              <PromptSection handlePromptClick={handlePromptClick} />
            </motion.div>
          ) : (
            <div className="space-y-6">
              {chatHistory.map((msg, idx) => (
                msg.message.length > 0 && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <Message className={`max-w-[80%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}>
                      <MessageAvatar
                        src={msg.sender === "user" ? peopleImage.src : botImage.src}
                        alt={msg.sender}
                        fallback={msg.sender === "user" ? "U" : "AI"}
                        className="bg-primary/10"
                      />
                      <MessageContent
                        markdown={msg.sender === "bot"}
                        className={cn(
                          "text-sm",
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted dark:text-gray-300 text-secondary-foreground",
                          "prose prose-sm max-w-none prose-p:my-0",
                          msg.sender === "user" ? "prose-invert" : ""
                        )}
                      >
                        {msg.message}
                      </MessageContent>
                    </Message>
                  </motion.div>
                )
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
          {loading && (
            <div className="flex items-start gap-3 mt-6"> {/* Added mt-6 for spacing */}
              <MessageAvatar
                src={botImage.src}
                alt="assistant"
                fallback="AI"
                className="bg-primary/10"
              />
              <div className="bg-muted rounded-lg p-3">
                <Loader variant="wave" size="md" className="[&_div]:bg-foreground" />
              </div>
            </div>
          )}
        </div>
      <div className="absolute bottom-4 right-4">
        <ScrollButton />
      </div>
      </StickToBottom>
      </ScrollArea>
      {/* You might want to conditionally render this button based on scroll position */}
    </CardContent>
  )
}

export default ChatSection;