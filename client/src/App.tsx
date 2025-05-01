import { FC, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Authed, Private, Setup } from './components/auth'
import { Loading } from './components/loading'
import { Providers } from './components/providers'
import { ThemeToggle } from './components/theme-toggle'
import { Toaster } from './components/ui/sonner'
import { useAuthStore } from './store'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Profile = lazy(() => import('./pages/profile'))
const ResetPassword = lazy(() => import('./pages/reset-password'))
const Chat = lazy(() => import('./pages/chat'))

const App: FC = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Providers>
      <div className="fixed end-4 top-4 z-10 md:end-8">
        <ThemeToggle />
      </div>
      <Toaster />
      {isCheckingAuth ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <Authed>
                    <Login />
                  </Authed>
                }
              />
              <Route
                path="/signup"
                element={
                  <Authed>
                    <Signup />
                  </Authed>
                }
              />
              <Route path="/" element={<Private />}>
                <Route path="profile" element={<Profile />} />
                <Route path="" element={<Setup />}>
                  <Route path="" element={<Chat />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      )}
    </Providers>
  )
}

export default App
