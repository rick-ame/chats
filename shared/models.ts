export const enum Color {
  Blue = 'blue',
  Gray = 'gray',
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  Rose = 'rose',
  Violet = 'violet',
  Yellow = 'yellow',
}
export const defaultColor = Color.Violet

export type User = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  avatar?: string
  color: Color
  profileSetup: boolean
}

export type UserRes = Omit<User, 'password'> & { id: string }
