"use client"
import React from 'react'
import dayjs from '@/lib/dayjs'
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { useConversationsQuery } from '@/lib/query'

type Conversation = {
  id: string
  title: string | null
  dateBucket: string
  createdAt?: string
}

interface ChatSidebarProps {
  onSelect: (conversation: Conversation) => void
  selectedId?: string | null
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelect, selectedId }) => {
  const { data, isLoading } = useConversationsQuery()
  const conversations: Conversation[] = data?.conversations ?? []

  if (isLoading) return <div className="p-4"><Loader variant="wave" /></div>

  const tz = dayjs.tz.guess() || 'UTC'
  const todayStr = dayjs().tz(tz).format('YYYY-MM-DD')
  const yestStr = dayjs().tz(tz).subtract(1, 'day').format('YYYY-MM-DD')

  const withinLast7 = (bucket: string) => {
    const diffDays = dayjs().tz(tz).diff(dayjs.tz(bucket, tz), 'day')
    return diffDays >= 2 && diffDays < 7
  }

  const groups: { label: string; items: Conversation[] }[] = [
    { label: 'Today', items: conversations.filter(c => c.dateBucket === todayStr) },
    { label: 'Yesterday', items: conversations.filter(c => c.dateBucket === yestStr) },
    { label: 'Last 7 Days', items: conversations.filter(c => withinLast7(c.dateBucket)) },
    {
      label: 'Earlier', items: conversations.filter(c => {
        const diffDays = dayjs().tz(tz).diff(dayjs.tz(c.dateBucket, tz), 'day')
        return diffDays >= 7
      })
    },
  ]

  return (
    <div className="w-72 border-r h-full overflow-y-auto bg-background">
      <div className="p-3 font-semibold sticky top-0 bg-background border-b">Your Conversations</div>
      <div className="p-2 space-y-3">
        {groups.map(group => (
          <div key={group.label}>
            {group.items.length > 0 && (
              <div className="text-xs uppercase tracking-wide text-muted-foreground px-1 mb-1">{group.label}</div>
            )}
            <div className="space-y-2">
              {group.items.map(c => (
                <Card key={c.id} className={`p-3 cursor-pointer ${selectedId === c.id ? 'ring-2 ring-primary' : ''}`} onClick={() => onSelect(c)}>
                  <div className="text-sm font-medium truncate">{c.title ?? 'Untitled'}</div>
                  <div className="text-xs text-muted-foreground">{c.dateBucket}</div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        {conversations.length === 0 && (
          <div className="text-xs text-muted-foreground p-3">No conversations yet. Start chatting!</div>
        )}
      </div>
    </div>
  )
}

export default ChatSidebar
