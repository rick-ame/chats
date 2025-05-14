import { RequestHandler } from 'express'
import { z } from 'zod'

import { logger } from '@/lib'
import { Locals } from '@/middlewares'
import { UserModel } from '@/models/user'
import { extendedUpdateSchema, ResError, ResUser, User } from '~'

export const getUserInfo: RequestHandler<
  unknown,
  ResUser | ResError,
  unknown,
  unknown,
  Locals
> = async (_req, res) => {
  try {
    const userId = res.locals.userId

    const user = await UserModel.findById(userId).select('-password')
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

export const updateProfile: RequestHandler<
  unknown,
  Partial<ResUser> | ResError,
  z.infer<typeof extendedUpdateSchema>,
  unknown,
  Locals
> = async (req, res) => {
  try {
    const userId = res.locals.userId
    const { email, firstName, lastName, color, avatar } = req.body

    const updates: Partial<User> = {
      email,
      firstName,
      lastName,
      color,
    }
    if (avatar !== undefined) {
      updates.avatar = avatar
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...updates,
        profileSetup: true,
      },
      {
        new: true,
      },
    )

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
      color: user.color,
      avatar: avatar !== undefined ? user.avatar : undefined,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
