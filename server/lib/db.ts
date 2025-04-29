import { connect, connection } from 'mongoose'

import { DATABASE_URI } from './env'

export const connectDB = async () => {
  await connect(DATABASE_URI)
  await connection.db?.admin().command({ ping: 1 })
}
