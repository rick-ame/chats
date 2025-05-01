import { ThemeProvider } from 'next-themes'
import {
  createContext,
  FC,
  PropsWithChildren,
  use,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useLocalStorage } from 'react-use'

import { useAuthStore } from '@/store'
import { Color } from '~'

const ColorContext = createContext<{
  setColor: (color: Color) => void
}>({
  setColor: () => {
    throw new Error(
      `You should implement ColorProvider first before setting color`,
    )
  },
})
const ColorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore()
  const [themeColor, setThemeColor] = useLocalStorage<Color>('theme-color')

  const setColor = useCallback((color: Color) => {
    document.documentElement.setAttribute('data-color', color)
  }, [])

  useLayoutEffect(() => {
    if (user?.color && user.color !== themeColor) {
      setColor(user.color)
      setThemeColor(user.color)
    } else if (themeColor) {
      setColor(themeColor)
    }
  }, [setColor, setThemeColor, user?.color, themeColor])

  return (
    <ColorContext.Provider value={{ setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
export const useThemeColor = () => use(ColorContext).setColor

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ColorProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ColorProvider>
  )
}
