import { Loader } from 'lucide-react'
import { motion, MotionProps } from 'motion/react'
import { ComponentProps, FC, PropsWithChildren } from 'react'

import { Button } from './ui/button'

const MotionButton = motion.create(Button)

interface Props {
  loading?: boolean
}
export const MButton: FC<
  PropsWithChildren<Props & ComponentProps<'button'> & MotionProps>
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
