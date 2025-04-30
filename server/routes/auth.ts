import { Router } from 'express'
import { z } from 'zod'

import { login, signup } from '@/controllers/auth'
import { validate } from '@/middlewares'
import { UserModel } from '@/models/user'
import { AuthApi } from '~/apis'
import { loginSchema, signupSchema } from '~/zod-schemas'

export const routes = Router()

const checkEmailAvailable = async (email: string) => {
  const found = await UserModel.findOne({ email })
  return !found
}

routes.post(
  AuthApi.Signup,
  validate(
    z.object({
      body: signupSchema.refine(
        async (data) => await checkEmailAvailable(data.email),
        {
          path: ['email'],
          message: 'Email has been registered',
        },
      ),
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
