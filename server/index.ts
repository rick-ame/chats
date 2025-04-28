import 'dotenv/config'

import path from 'node:path'

import express from 'express'
import { AUTH, PREFIX } from 'shared/apis'

import { logger } from '@/lib'

const PORT = process.env.PORT || 3000

const app = express()

const staticFiles = path.resolve(__dirname, '../../../client/dist')
app.use(express.static(staticFiles))

app.use(express.json())

app.post(`${PREFIX}${AUTH.signUp}`, (req, res) => {
  const { username } = req.body
  res.status(200).json({
    message: `Hello ${username}!`,
  })
})

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(staticFiles, 'index.html'))
})

app.listen(PORT, () => {
  logger.info(`server is running at: ${PORT}!`)
})
