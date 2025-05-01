import { Router } from 'express'
import { z } from 'zod'

import {
  extendedPatchSchema,
  getUserInfo,
  patchProfile,
} from '@/controllers/user'
import { validate, verifyToken } from '@/middlewares'
import { UserApi } from '~'

export const routes = Router()

routes.get(UserApi.UserInfo, verifyToken, getUserInfo)

routes.patch(
  UserApi.UserInfo,
  verifyToken,
  validate(
    z.object({
      body: extendedPatchSchema,
    }),
  ),
  patchProfile,
)
