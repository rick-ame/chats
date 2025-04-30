import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { JWT_KEY } from '@/lib'
import { ResError } from '~/response-error'

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

export type Locals = {
  userId: string
}
export const verifyToken: RequestHandler<
  unknown,
  ResError,
  unknown,
  unknown,
  Locals
> = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.status(401).json({ message: 'Authorization error' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as jwt.JwtPayload
    res.locals.userId = decoded.userId

    next()
  } catch {
    res.status(401).json({ message: 'Authorization error' })
  }
}
