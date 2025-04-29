import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useUserStore } from '@/store'

const Setup: FC = () => {
  const { userInfo } = useUserStore()

  if (!userInfo?.profileSetup) {
    return <Navigate to="/profile" />
  }

  return <Outlet />
}

export default Setup
