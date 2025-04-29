import { RequestHandler } from 'express'
import { z } from 'zod'

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
