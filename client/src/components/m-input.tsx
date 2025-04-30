import { LucideIcon } from 'lucide-react'
import { motion, MotionProps } from 'motion/react'
import { ComponentProps, FC } from 'react'

import { Input } from './ui/input'

const MotionInput = motion.create(Input)

interface Props {
  icon: LucideIcon
}
export const MInput: FC<Props & ComponentProps<'input'> & MotionProps> = ({
  icon: Icon,
  ...props
}) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="text-primary size-5" />
      </div>
      <MotionInput className="pl-10 pr-3" {...props} />
    </div>
  )
}
