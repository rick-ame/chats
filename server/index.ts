import 'dotenv/config'

import path from 'node:path'

import cookieParser from 'cookie-parser'
import express from 'express'

import { prefix } from '~'

import { checkEnv, connectDB, logger, PORT } from './lib'
import { routes as authRoutes } from './routes/auth'
import { routes as contactRoutes } from './routes/contact'
import { routes as userRoutes } from './routes/user'
import { setupSocket } from './socket'

try {
  checkEnv()
} catch (error) {
  logger.error(error)
  process.exit(1)
}

const app = express()

const staticFiles = path.resolve(import.meta.dirname, '../public')
app.use(express.static(staticFiles))

app.use(cookieParser())
app.use(
  express.json({
    limit: '1mb',
  }),
)

app.use(prefix, authRoutes)
app.use(prefix, userRoutes)
app.use(prefix, contactRoutes)

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(staticFiles, 'index.html'))
})

async function main() {
  await connectDB()
  logger.info('successfully connected to MongoDB!')

  const server = await app.listen(PORT)

  setupSocket(server)

  logger.info(`server is running at: ${PORT}!`)
}
main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
