import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'

import { Button } from './ui/button'

export const ThemeToggle: FC = () => {
  const { setTheme, theme, themes } = useTheme()

  return (
    <Button
      variant="ghost"
      className="hover:bg-background/50 w-10 px-0"
      onClick={() => {
        if (theme === themes[0]) {
          setTheme(themes[1])
        } else {
          setTheme(themes[0])
        }
      }}
    >
      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
