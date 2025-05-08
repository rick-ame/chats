import { RequestHandler } from 'express'
import { z } from 'zod'

import { logger } from '@/lib'
import { Locals } from '@/middlewares'
import { UserModel } from '@/models/user'
import { ResError, ResUser, searchContactsSchema } from '~'

export const searchContacts: RequestHandler<
  unknown,
  Partial<ResUser>[] | ResError,
  unknown,
  z.infer<typeof searchContactsSchema>,
  Locals
> = async (req, res) => {
  try {
    const userId = res.locals.userId
    const { searchTerm } = req.query
    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    )
    const regex = new RegExp(sanitizedSearchTerm, 'i')
    const contacts = await UserModel.find({
      $and: [
        {
          $and: [{ _id: { $ne: userId } }, { profileSetup: { $eq: true } }],
        },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    })

    res.status(200).json(
      contacts.map((c) => ({
        id: c.id,
        email: c.email,
        firstName: c.firstName,
        lastName: c.lastName,
        avatar: c.avatar,
        color: c.color,
      })),
    )
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
