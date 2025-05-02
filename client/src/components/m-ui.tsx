import { Loader, LucideIcon } from 'lucide-react'
import { motion, MotionProps } from 'motion/react'
import { ComponentProps, FC, PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Input } from './ui/input'

const MotionInput = motion.create(Input)
export const MInput: FC<
  {
    icon: LucideIcon
  } & ComponentProps<'input'> &
    MotionProps
> = ({ icon: Icon, className, ...props }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <Icon className="text-primary size-5" />
      </div>
      <MotionInput className={cn('pe-3 ps-10', className)} {...props} />
    </div>
  )
}

const MotionButton = motion.create(Button)
export const MButton: FC<
  PropsWithChildren<
    {
      loading?: boolean
    } & ComponentProps<'button'> &
      MotionProps
  >
> = ({ loading, children, ...props }) => {
  return (
    <MotionButton
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader className="mx-auto h-6 w-6 animate-spin" /> : children}
    </MotionButton>
  )
}
