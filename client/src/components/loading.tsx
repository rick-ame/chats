import { motion } from 'motion/react'
import { type FC, useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { Background } from './background'

export const LoadingScreen: FC = () => {
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

export const LoadingSkeleton: FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return show ? (
    <div className="items-top bg-primary/10 flex w-full max-w-md space-x-4 rounded-2xl px-4 py-8 shadow-xl backdrop-blur-3xl backdrop-filter">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full bg-gray-200" />
      <div className="w-full space-y-3">
        <Skeleton className="bg-primary/30 h-4 w-full" />
        <Skeleton className="bg-primary/30 h-4 w-full" />
        <Skeleton className="h-4 w-3/4 bg-gray-300" />
        <Skeleton className="h-4 w-3/4 bg-gray-300" />
        <Skeleton className="h-4 w-3/4 bg-gray-300" />
      </div>
    </div>
  ) : null
}
