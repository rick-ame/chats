import { Check } from 'lucide-react'
import { CSSProperties, FC } from 'react'

import { useThemeColor } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Color } from '~'

const colorMapping: Record<Color, string> = {
  [Color.enum.blue]: 'hsl(221.2 83.2% 53.3%)',
  [Color.enum.gray]: 'hsl(240 5.9% 10%)',
  [Color.enum.green]: 'hsl(142.1 76.2% 36.3%)',
  [Color.enum.orange]: 'hsl(24.6 95% 53.1%)',
  [Color.enum.red]: 'hsl(0 72.2% 50.6%)',
  [Color.enum.rose]: 'hsl(346.8 77.2% 49.8%)',
  [Color.enum.violet]: 'hsl(262.1 83.3% 57.8%)',
  [Color.enum.yellow]: 'hsl(47.9 95.8% 53.1%)',
} as const

interface Props {
  color: Color
}
export const ColorOption: FC<Props> = ({ color }) => {
  const { color: themeColor = Color.enum.violet, setColor } = useThemeColor()

  return (
    <Button
      size="sm"
      type="button"
      className="dark:hover:bg-primary/20 w-full bg-gray-100 text-[10px] sm:text-[12px] dark:bg-gray-800"
      style={{ '--theme-color': colorMapping[color] } as CSSProperties}
      onClick={() => {
        setColor(color)
      }}
    >
      <span className="bg-(--theme-color) size-3 shrink-0 rounded-full sm:size-4">
        {color === themeColor && <Check className="text-white" />}
      </span>
      <span className="text-foreground capitalize">{color}</span>
    </Button>
  )
}
