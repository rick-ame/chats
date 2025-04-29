import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useUserStore } from '@/store'

const Private: FC = () => {
  const { userInfo } = useUserStore()

  if (!userInfo) {
    return <Navigate to="/auth" />
  }

  return <Outlet />
}

export default Private
