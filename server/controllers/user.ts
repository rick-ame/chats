import { RequestHandler } from 'express'

import { logger } from '../lib'
import { UserModel } from '../models/user'

export const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.$userId
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
      image: user.image,
      color: user.color,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
