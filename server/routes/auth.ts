import { Router } from 'express'
import { AuthApi } from 'shared/apis'
import { signupSchema } from 'shared/zod-schemas'
import { z } from 'zod'

import { signup } from '@/controllers/auth'
import { validate } from '@/middlewares'
import { UserModel } from '@/models/user'

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
