import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { JWT_KEY } from '@/lib'

export const validate =
  (schema: z.AnyZodObject): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      })
      next()
    } catch (error) {
      res.status(400).json(error)
    }
  }

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.status(401).json({ message: 'Authorization error' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as jwt.JwtPayload
    req.params.$userId = decoded.userId

    next()
  } catch {
    res.status(401).json({ message: 'Authorization error' })
  }
}
