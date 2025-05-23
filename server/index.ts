import 'dotenv/config'

import { createServer } from 'node:http'
import path from 'node:path'

import cookieParser from 'cookie-parser'
import express from 'express'

import { checkEnv, connectDB, logger, PORT } from '@/lib'
import { routes as authRoutes } from '@/routes/auth'
import { routes as contactRoutes } from '@/routes/contact'
import { routes as userRoutes } from '@/routes/user'
import { setupSocket } from '@/socket'
import { prefix } from '~'

try {
  checkEnv()
} catch (error) {
  logger.error(error)
  process.exit(1)
}

const app = express()
const server = createServer(app)

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

setupSocket(server)

app.get('/health', (_req, res) => {
  res.status(200).end('Hi!')
})

app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(staticFiles, 'index.html'))
})

async function main() {
  await connectDB()
  logger.info('successfully connected to MongoDB!')

  await server.listen(PORT)
  logger.info(`server is running at: ${PORT}!`)
}
main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
