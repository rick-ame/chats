import { motion } from 'motion/react'
import { FC, PropsWithChildren } from 'react'

const FloatingShape: FC<{
  color: string
  size: string
  position: string
  delay: number
}> = ({ color, size, position, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} ${position} opacity-20 blur-xl`}
      animate={{
        y: ['0%', '100%', '0%'],
        x: ['0%', '100%', '0%'],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  )
}

export const Background: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="via-primary/40 to-primary/20 dark:via-primary/30 from-primary/15 relative flex min-h-dvh min-w-[360px] items-center justify-center overflow-hidden bg-gradient-to-br p-4">
      <FloatingShape
        color="bg-primary/50 dark:bg-primary/30"
        size="size-64"
        position="-top-[5%] start-[10%]"
        delay={0}
      />
      <FloatingShape
        color="bg-primary/70"
        size="size-48"
        position="top-[70%] start-[80%]"
        delay={5}
      />
      <FloatingShape
        color="bg-primary/80"
        size="size-32"
        position="top-[40%] -start-[5%]"
        delay={2}
      />
      {children}
    </div>
  )
}
