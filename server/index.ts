import 'dotenv/config'

import path from 'node:path'

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

const staticFiles = path.resolve(__dirname, '../../../client/dist')
app.use(express.static(staticFiles))

app.use(cookieParser())
app.use(express.json())

app.use(prefix, authRoutes)
app.use(prefix, userRoutes)

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(staticFiles, 'index.html'))
})

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
