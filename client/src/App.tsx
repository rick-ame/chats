import { FC, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Authed from './components/authed'
import Loading from './components/loading'
import Private from './components/private'
import { Providers } from './components/providers'
import Setup from './components/setup'
import { ThemeToggle } from './components/theme-toggle'
import { Toaster } from './components/ui/sonner'
import { useUserStore } from './store'

const Auth = lazy(() => import('./pages/auth'))
const Profile = lazy(() => import('./pages/profile'))
const Chat = lazy(() => import('./pages/chat'))

const App: FC = () => {
  const { loading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  return (
    <Providers>
      <div className="fixed end-4 top-4 md:end-8">
        <ThemeToggle />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Authed />}>
                <Route path="" element={<Auth />} />
              </Route>
              <Route path="/" element={<Private />}>
                <Route path="profile" element={<Profile />} />
                <Route path="" element={<Setup />}>
                  <Route path="chat" element={<Chat />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </Suspense>
      )}
    </Providers>
  )
}

export default App
