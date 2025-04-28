import 'dotenv/config'

import express from 'express'
import { AUTH, PREFIX } from 'shared/apis'

const app = express()

app.use(express.json())

app.post(`${PREFIX}${AUTH.signUp}`, (req, res) => {
  const { username } = req.body
  res.status(200).json({
    message: `Hello ${username}!`,
  })
})

app.listen(process.env.PORT || 3000)
