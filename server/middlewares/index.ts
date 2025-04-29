import { RequestHandler } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate =
  (schema: AnyZodObject): RequestHandler =>
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
      if (error instanceof ZodError) {
        res.status(400).json(error.format())
      } else {
        res.status(400).json(error)
      }
    }
  }
