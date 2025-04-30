import { ThemeProvider } from 'next-themes'
import {
  createContext,
  FC,
  PropsWithChildren,
  use,
  useLayoutEffect,
  useState,
} from 'react'

import { useAuthStore } from '@/store'
import { Color, defaultColor } from '~/models'

const ColorContext = createContext<{
  setColor: (color: Color) => void
}>({
  setColor: () => {
    throw new Error(
      `You should implement ColorProvider first before setting color`,
    )
  },
})
const ColorProvider: FC<PropsWithChildren<{ color: Color }>> = ({
  children,
  color: userColor,
}) => {
  const [color, setColor] = useState(userColor)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-color', color)
  }, [color])

  return (
    <ColorContext.Provider value={{ setColor }}>
      {children}
    </ColorContext.Provider>
  )
}
export const useColor = () => use(ColorContext)

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthStore()

  const color = user?.color || defaultColor

  return (
    <ColorProvider color={color}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        {children}
      </ThemeProvider>
    </ColorProvider>
  )
}
