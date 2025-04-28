import { Moon, Sun } from 'lucide-react'
import { FC, useLayoutEffect } from 'react'
import { useLocalStorage } from 'react-use'

import { Button } from './ui/button'

export const ThemeToggle: FC = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>('isDarkTheme', true)

  useLayoutEffect(() => {
    const body = document.querySelector('body')
    if (isDark) {
      body?.classList.add('dark')
    } else {
      body?.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Button
      variant="ghost"
      className="w-10 px-0"
      onClick={() => {
        setIsDark(!isDark)
      }}
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
