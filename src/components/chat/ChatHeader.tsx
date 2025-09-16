import React from 'react'
import { CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { Menu, Plus } from 'lucide-react'
import Image from 'next/image'
import logo from '../../../public/assets/logo.png'

interface ChatHeaderProps {
  onMenuClick?: () => void;
  onNewChat?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMenuClick, onNewChat }) => {
  return (
    <CardHeader className="border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar>
              <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
              <AvatarFallback className="bg-primary text-primary-foreground">
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
          </div>
          <div>
            <CardTitle>MindfulAI</CardTitle>
            <CardDescription>Your safe space to talk. Currently online.</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onNewChat && (
            <Button variant="outline" size="sm" onClick={onNewChat}>
              <Plus className="w-4 h-4 mr-1" /> New Chat
            </Button>
          )}
          {/* Menu button for mobile/alternative access */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

export default ChatHeader
