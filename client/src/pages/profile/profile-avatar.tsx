import { ImagePlus, X } from 'lucide-react'
import { ChangeEventHandler, FC, useRef } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store'

const maxSize = 1024 * 1024 * 500

interface Props {
  image: string
  setImage: (image: string) => void
}
export const ProfileAvatar: FC<Props> = ({ image, setImage }) => {
  const { user } = useAuthStore()

  const { email, firstName = '' } = user!

  const inputRef = useRef<HTMLInputElement>(null)

  const onChange: ChangeEventHandler = () => {
    const file = inputRef.current?.files?.[0]
    if (file) {
      if (file.size > maxSize) {
        toast.error('Image size cannot be greater than 500K')
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImage(e.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className="relative mx-auto w-fit">
      <input
        hidden
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
      />
      <div className="group rounded-full">
        <Avatar
          className="size-20"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          <AvatarImage src={image} alt="Avatar" />
          <AvatarFallback className="bg-primary/70 text-primary-foreground text-4xl font-bold">
            {(firstName.charAt(0) || email.charAt(0)).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <button
          className="text-primary absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center rounded-full bg-black/80 group-hover:flex"
          type="button"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          <ImagePlus />
        </button>
      </div>
      {image && (
        <Button
          size="icon"
          variant="destructive"
          className="absolute -right-1.5 top-0 size-7 rounded-full"
          type="button"
          onClick={() => {
            setImage('')
          }}
        >
          <X />
        </Button>
      )}
    </div>
  )
}
