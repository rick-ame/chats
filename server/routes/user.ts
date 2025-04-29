import { Router } from 'express'

import { getUserInfo } from '../controllers/user.js'
import { verifyToken } from '../middlewares.js'
import { UserApi } from '../shared/apis.js'

export const routes = Router()

routes.get(UserApi.UserInfo, verifyToken, getUserInfo)
