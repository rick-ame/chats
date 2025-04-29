import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Providers } from './components/providers'
import { ThemeToggle } from './components/theme-toggle'
import { Toaster } from './components/ui/sonner'
import Auth from './pages/auth'

const App: FC = () => {
  return (
    <Providers>
      <div className="fixed end-4 top-4 md:end-8">
        <ThemeToggle />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Providers>
  )
}

export default App
