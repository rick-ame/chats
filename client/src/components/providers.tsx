import { ThemeProvider } from 'next-themes'
import {
  createContext,
  FC,
  PropsWithChildren,
  use,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { useLocalStorage } from 'react-use'

import { useAuthStore } from '@/store'
import { Color } from '~'

const ColorContext = createContext<{
  color?: Color
  setColor: (color?: Color) => void
}>({
  setColor: () => {
    throw new Error(
      `You should implement ColorProvider first before setting color`,
    )
  },
})
const ColorProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore()
  const [storageColor, setStorageColor] = useLocalStorage<Color>('theme-color')
  const [color, setColor] = useState<Color>()

  const setThemeColor = useCallback((color?: Color) => {
    setColor(color)
    document.documentElement.setAttribute('data-color', color || '')
  }, [])

  useLayoutEffect(() => {
    if (user?.color && user.color !== storageColor) {
      setThemeColor(user.color)
      setStorageColor(user.color)
    } else if (storageColor) {
      setThemeColor(storageColor)
    }
  }, [setThemeColor, setStorageColor, user?.color, storageColor])

  return (
    <ColorContext.Provider value={{ color, setColor: setThemeColor }}>
      {children}
    </ColorContext.Provider>
  )
}
export const useThemeColor = () => use(ColorContext)

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ColorProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ColorProvider>
  )
}
