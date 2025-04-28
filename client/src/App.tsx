import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ThemeToggle } from './components/theme-toggle'
import Auth from './pages/auth'

const App: FC = () => {
  return (
    <>
      <div className="fixed end-4 top-4 md:end-8">
        <ThemeToggle />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
