import { motion } from 'motion/react'
import { FC, PropsWithChildren } from 'react'

const FloatingShape: FC<{
  color: string
  size: string
  top: string
  left: string
  delay: number
}> = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
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
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-primary/70"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-primary/80"
        size="w-32 h-32"
        top="40%"
        left="-5%"
        delay={2}
      />
      {children}
    </div>
  )
}
