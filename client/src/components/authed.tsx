import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useUserStore } from '@/store'

const Authed: FC = () => {
  const { userInfo } = useUserStore()

  return userInfo ? <Navigate to="/" /> : <Outlet />
}

export default Authed
