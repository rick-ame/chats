import { MessageSquareText, Send, X } from 'lucide-react'
import { type FC, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useAuthStore, useContactStore } from '@/store'
import { MessageType } from '~'

import { ChatAvatar } from './chat-avatar'

export const Dialogue: FC = () => {
  const { user } = useAuthStore()
  const { currentChattingWith, messages, send, close } = useContactStore()

  const { id: userId } = user!

  const [message, setMessage] = useState('')

  return currentChattingWith ? (
    <div className="inset-0 flex w-full flex-col py-6 backdrop-blur-3xl max-sm:absolute max-sm:bg-gray-100/85">
      <header className="flex items-center border-b border-b-gray-100 px-4 pb-4 dark:border-b-gray-100/50">
        <div className={'avatar-' + currentChattingWith.color}>
          <ChatAvatar
            avatar={currentChattingWith.avatar}
            name={currentChattingWith.firstName!}
          />
        </div>
        <h3 className="w-80px grow-1 ms-3 truncate text-xl font-semibold">
          {currentChattingWith.firstName} {currentChattingWith.lastName}
        </h3>
        <Button variant="ghost" onClick={close}>
          <X className="size-6" />
          <span className="sr-only">Close</span>
        </Button>
      </header>
      <div className="grow-1">
        <ScrollArea className="p-4">
          <div className="flex w-full flex-col gap-2">
            {messages?.map((msg) => (
              <p
                key={msg.id}
                className={cn(
                  'flex w-[70%] gap-1',
                  msg.sender.id === userId && 'flex-row-reverse self-end',
                  'avatar-' + msg.sender.color,
                )}
              >
                <ChatAvatar
                  size="sm"
                  name={msg.sender.firstName!}
                  avatar={msg.sender.avatar}
                />
                <span
                  className={cn(
                    'rounded-md px-2 text-black',
                    msg.sender.id === userId ? 'bg-green-500' : 'bg-white',
                  )}
                >
                  {msg.content}
                </span>
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
      <footer className="flex items-center gap-2 border-t border-t-gray-100 px-4 pt-4 dark:border-t-gray-100/50">
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          className="bg-gray-100/50 dark:bg-gray-500/30"
        />
        <Button
          size="icon"
          disabled={!message.trim()}
          onClick={() => {
            send({
              sender: user!.id,
              recipient: currentChattingWith.id,
              messageType: MessageType.enum.text,
              content: message.trim(),
            })
            setMessage('')
          }}
        >
          <Send />
          <span className="sr-only">Send</span>
        </Button>
      </footer>
    </div>
  ) : (
    <div className="hidden w-full items-center justify-center sm:flex">
      <MessageSquareText className="text-primary size-25" />
    </div>
  )
}
