import { ThemeProvider } from 'next-themes'
import {
  createContext,
  FC,
  PropsWithChildren,
  use,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

import { getStorageColor, setStorageColor } from '@/lib/utils'
import { useAuthStore } from '@/store'
import { Color } from '~'

const ColorContext = createContext<{
  color?: Color
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
  const [color, setColor] = useState<Color | undefined>(getStorageColor())

  useLayoutEffect(() => {
    if (color) {
      document.documentElement.setAttribute('data-color', color)
    }
  }, [color])

  useEffect(() => {
    if (user?.color) {
      setColor(user.color)
      setStorageColor(user.color)
    }
  }, [user?.color, setColor])

  return <ColorContext value={{ color, setColor }}>{children}</ColorContext>
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
