import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

import { useUserStore } from '@/store'

const Setup: FC = () => {
  const { userInfo } = useUserStore()

  if (!userInfo?.profileSetup) {
    toast.warning('Please setup profile to continue')
    return <Navigate to="/profile" />
  }

  return <Outlet />
}

export default Setup
