export type User = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  avatar?: string
  color?: number
  profileSetup: boolean
}

export type UserRes = Omit<User, 'password'> & { id: string }
