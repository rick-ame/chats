import { RequestHandler } from 'express'

import { logger } from '@/lib'
import { Locals } from '@/middlewares'
import { UserModel } from '@/models/user'
import { UserRes } from '~/models'
import { ResError } from '~/response-error'

export const getUserInfo: RequestHandler<
  unknown,
  UserRes | ResError,
  unknown,
  unknown,
  Locals
> = async (req, res) => {
  try {
    const userId = res.locals.userId

    const user = await UserModel.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      color: user.color,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
