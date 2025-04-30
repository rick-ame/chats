import { motion } from 'motion/react'

import { Background } from './background'

export const Loading = () => {
  return (
    <Background>
      <motion.div
        className="border-t-primary border-primary/20 size-14 rounded-full border-4 border-t-4 brightness-50 dark:brightness-150"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </Background>
  )
}
