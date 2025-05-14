import { motion } from 'motion/react'
import type { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-2xl bg-gray-100/30 shadow-2xl backdrop-blur-xl backdrop-filter dark:bg-gray-900/30"
    >
      {children}
    </motion.main>
  )
}

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className="from-primary via-primary/80 to-primary bg-gradient-to-br bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl">
      {children}
    </h2>
  )
}
