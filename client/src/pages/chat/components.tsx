import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  className: string
  avatar?: string
  name: string
}
export const ChatAvatar: FC<Props> = ({ className, avatar, name }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar || undefined} alt="Avatar" />
      <AvatarFallback className="bg-primary/70 text-primary-foreground text-4xl font-bold">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
