import { Router } from 'express'
import { z } from 'zod'

import { login, logout, signup } from '@/controllers/auth'
import { validate } from '@/middlewares'
import { AuthApi, loginSchema, signupSchema } from '~'

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

routes.post(AuthApi.Logout, logout)
