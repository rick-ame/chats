import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Props {
  size?: 'lg' | 'sm'
  avatar?: string
  name: string
}
export const ChatAvatar: FC<Props> = ({ size, avatar, name }) => {
  return (
    <Avatar
      className={cn(
        'size-10',
        size === 'lg' && 'size-12',
        size === 'sm' && 'size-6',
      )}
    >
      <AvatarImage src={avatar || undefined} alt="Avatar" />
      <AvatarFallback
        className={cn(
          'bg-primary/70 text-primary-foreground text-2xl font-bold',
          size === 'lg' && 'text-3xl',
          size === 'sm' && 'text-sm',
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
