import { Router } from 'express'
import { UserApi } from 'shared/apis'

import { getUserInfo } from '@/controllers/user'
import { verifyToken } from '@/middlewares'

export const routes = Router()

routes.get(UserApi.UserInfo, verifyToken, getUserInfo)
