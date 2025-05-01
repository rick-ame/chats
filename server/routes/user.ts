import { Router } from 'express'

import { getUserInfo } from '@/controllers/user'
import { verifyToken } from '@/middlewares'
import { UserApi } from '~'

export const routes = Router()

routes.get(UserApi.UserInfo, verifyToken, getUserInfo)
