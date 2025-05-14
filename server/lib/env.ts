export const PORT = process.env.PORT || 8000
export const DATABASE_URL = process.env.DATABASE_URL as string
export const JWT_SECRET = process.env.JWT_SECRET as string

export const checkEnv = () => {
  if (!DATABASE_URL) {
    throw new Error('env DATABASE_URL is required!')
  }
  if (!JWT_SECRET) {
    throw new Error('env JWT_SECRET is required!')
  }
}
