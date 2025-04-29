export const PORT = process.env.PORT || 3000
export const DATABASE_URI = process.env.DATABASE_URI as string
export const JWT_KEY = process.env.JWT_KEY as string

export const checkEnv = () => {
  if (!DATABASE_URI) {
    throw new Error('DATABASE_URI is required!')
  }
  if (!JWT_KEY) {
    throw new Error('JWT_KEY is required!')
  }
}
