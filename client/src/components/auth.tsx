import { FC, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router'
import { toast } from 'sonner'

import { useAuthStore } from '@/store'

export const Authed: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore()

  return user ? <Navigate to="/" replace /> : children
}

export const Private: FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export const Setup: FC = () => {
  const { user } = useAuthStore()

  if (!user?.profileSetup) {
    toast.warning('Please setup profile to continue')

    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}
