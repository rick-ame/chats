import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store'

export const ChatAvatar: FC = () => {
  const { user } = useAuthStore()
  const { avatar, firstName } = user!

  return (
    <Avatar className="size-10">
      <AvatarImage src={avatar || undefined} alt="Avatar" />
      <AvatarFallback className="bg-primary/70 text-primary-foreground text-4xl font-bold">
        {firstName!.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
