import 'dotenv/config'

import cookieParser from 'cookie-parser'
import express from 'express'
import { prefix } from 'shared/apis'

import { checkEnv, connectDB, logger, PORT } from './lib'
import { routes as authRoutes } from './routes/auth'
import { routes as userRoutes } from './routes/user'

try {
  checkEnv()
} catch (error) {
  logger.error(error)
  process.exit(1)
}

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(prefix, authRoutes)
app.use(prefix, userRoutes)

async function main() {
  await connectDB()
  logger.info('successfully connected to MongoDB!')

  app.listen(PORT, () => {
    logger.info(`server is running at: ${PORT}!`)
  })
}
main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
