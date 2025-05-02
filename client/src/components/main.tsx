import { motion } from 'motion/react'
import { FC, PropsWithChildren } from 'react'

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-background/60 w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 shadow-2xl backdrop-blur-xl backdrop-filter"
    >
      {children}
    </motion.main>
  )
}
