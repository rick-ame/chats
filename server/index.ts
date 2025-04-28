import 'dotenv/config'

import express from 'express'
import { AUTH, PREFIX } from 'shared/apis'

import { logger } from '@/lib'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post(`${PREFIX}${AUTH.signUp}`, (req, res) => {
  const { username } = req.body
  res.status(200).json({
    message: `Hello ${username}!`,
  })
})

app.listen(PORT, () => {
  logger.info(`server is running at: ${PORT}!`)
})
