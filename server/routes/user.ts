import { Router } from 'express'
import { z } from 'zod'

import {
  extendedUpdateSchema,
  getUserInfo,
  updateProfile,
} from '@/controllers/user'
import { validate, verifyToken } from '@/middlewares'
import { UserApi } from '~'

export const routes = Router()

routes.get(UserApi.UserInfo, verifyToken, getUserInfo)

routes.post(
  UserApi.UserInfo,
  verifyToken,
  validate(
    z.object({
      body: extendedUpdateSchema,
    }),
  ),
  updateProfile,
)
