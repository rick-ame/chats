import { type FC, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router'

import { Authed, Private, Setup } from './components/auth'
import { Background } from './components/background'
import { LoadingScreen, LoadingSkeleton } from './components/loading'
import { Providers } from './components/providers'
import { ThemeToggle } from './components/theme-toggle'
import { Toaster } from './components/ui/sonner'
import { useAuthStore } from './store'

const Login = lazy(() => import('./pages/login'))
const Signup = lazy(() => import('./pages/signup'))
const Profile = lazy(() => import('./pages/profile'))
const ResetPassword = lazy(() => import('./pages/reset-password'))
const Chat = lazy(() => import('./pages/chat'))

const Router: FC = () => {
  return useRoutes([
    {
      path: '/login',
      element: (
        <Authed>
          <Login />
        </Authed>
      ),
    },
    {
      path: '/signup',
      element: (
        <Authed>
          <Signup />
        </Authed>
      ),
    },
    {
      path: '/',
      element: <Private />,
      children: [
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: '',
          element: <Setup />,
          children: [
            {
              path: '',
              element: <Chat />,
            },
            {
              path: 'reset-password',
              element: <ResetPassword />,
            },
            {
              path: '*',
              element: <Navigate to="/" replace />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ])
}

const App: FC = () => {
  const { checkingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Providers>
      <div className="fixed end-4 top-4 z-10 md:end-8">
        <ThemeToggle />
      </div>
      <Toaster />
      {checkingAuth ? (
        <LoadingScreen />
      ) : (
        <Background>
          <Suspense fallback={<LoadingSkeleton />}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Suspense>
        </Background>
      )}
    </Providers>
  )
}

export default App
