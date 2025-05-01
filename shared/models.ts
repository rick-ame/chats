import { z } from 'zod'

const colors = [
  'blue',
  'gray',
  'green',
  'orange',
  'red',
  'rose',
  'violet',
  'yellow',
] as const
export const Color = z.enum(colors)
export type Color = z.infer<typeof Color>

export type User = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  avatar?: string
  color?: Color
  profileSetup: boolean
}
