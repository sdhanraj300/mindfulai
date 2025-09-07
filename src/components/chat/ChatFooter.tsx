import React from 'react'
import { CardFooter } from '../ui/card'
import { PromptInput, PromptInputAction, PromptInputActions, PromptInputTextarea } from '../ui/prompt-input'
import { Button } from '../ui/button'
import { SendHorizontalIcon } from 'lucide-react'

import { motion } from 'framer-motion'

interface ChatFooterProps {
  handleSend: () => void;
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const ChatFooter = ({ handleSend, input, setInput, loading, inputRef }: ChatFooterProps) => {
  return (
    <CardFooter className="border-t">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <PromptInput
            isLoading={loading}
            value={input}
            onValueChange={setInput}
            onSubmit={handleSend}
            className="relative flex items-center"
          >
            <PromptInputTextarea
              ref={inputRef}
              placeholder="Type your message here..."
              className="pl-4 pr-14 dark:bg-transparent text-foreground text-md!"  // Padding for the button
            />
            <PromptInputActions className="absolute p-2 right-2">
              <PromptInputAction tooltip="Send Message" side="top">
                <Button
                  onClick={handleSend}
                  disabled={loading || input.trim() === ""}
                  size="icon"
                  className="rounded-full w-10 h-10 transition-colors"
                >
                  <SendHorizontalIcon className="w-5 h-5" />
                </Button>
              </PromptInputAction>
            </PromptInputActions>
          </PromptInput>
        </motion.div>
      </CardFooter>
)
}

export default ChatFooter
