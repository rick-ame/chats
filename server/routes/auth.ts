import { Router } from 'express'
import { z } from 'zod'

import { login, signup } from '@/controllers/auth'
import { validate } from '@/middlewares'
import { AuthApi } from '~/apis'
import { loginSchema, signupSchema } from '~/zod-schemas'

export const routes = Router()

routes.post(
  AuthApi.Signup,
  validate(
    z.object({
      body: signupSchema,
    }),
  ),
  signup,
)

routes.post(
  AuthApi.Login,
  validate(
    z.object({
      body: loginSchema,
    }),
  ),
  login,
)
