import { FC } from 'react'

import { useContactStore } from '@/store'

import { ChatAvatar } from './chat-avatar'

export const Detail: FC = () => {
  const { currentChattingWith } = useContactStore()

  return currentChattingWith ? (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-xl font-semibold">
        {currentChattingWith.firstName} {currentChattingWith.lastName}
      </h3>
      <div className={'avatar-' + currentChattingWith.color}>
        <ChatAvatar
          size="lg"
          avatar={currentChattingWith.avatar}
          name={currentChattingWith.firstName!}
        />
      </div>
      <p>{currentChattingWith.email}</p>
    </div>
  ) : (
    <div>Contact Detail</div>
  )
}
