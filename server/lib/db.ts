import mongoose from 'mongoose'

import { DATABASE_URI } from './env'

export const connectDB = async () => {
  await mongoose.connect(DATABASE_URI)
  await mongoose.connection.db?.admin().command({ ping: 1 })
}
