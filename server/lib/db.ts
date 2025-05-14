import mongoose from 'mongoose'

import { DATABASE_URL } from './env'

export const connectDB = async () => {
  await mongoose.connect(DATABASE_URL)
  await mongoose.connection.db?.admin().command({ ping: 1 })
}
