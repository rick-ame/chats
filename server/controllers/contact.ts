import { RequestHandler } from 'express'
import { z } from 'zod'

import { logger } from '@/lib'
import { Locals } from '@/middlewares'
import { MessageModel } from '@/models/message'
import { UserModel } from '@/models/user'
import { ResError, ResMessage, ResUser, searchContactsSchema } from '~'

export const getContacts: RequestHandler<
  unknown,
  Partial<ResUser>[] | ResError,
  unknown,
  unknown,
  Locals
> = async (_req, res) => {
  try {
    const userId = res.locals.userId

    const messages = await MessageModel.find({
      $or: [{ sender: userId }, { recipient: userId }],
    })
    const contactIDs = new Set<string>()
    messages.forEach(({ sender, recipient }) => {
      contactIDs.add(sender.toString())
      contactIDs.add(recipient.toString())
    })
    contactIDs.delete(userId)

    const contacts = await UserModel.find({
      _id: { $in: Array.from(contactIDs) },
    }).select('-password')

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
          $and: [{ _id: { $ne: userId } }, { profileSetup: true }],
        },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    }).select('-password')

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

export const getMessages: RequestHandler<
  { id: string },
  ResMessage[] | ResError,
  unknown,
  z.infer<typeof searchContactsSchema>,
  Locals
> = async (req, res) => {
  try {
    const userId = res.locals.userId
    const { id } = req.params

    const messages = await MessageModel.find<
      Omit<ResMessage, 'recipientId'> & {
        recipient: {
          id: string
        }
      }
    >({
      $or: [
        { sender: userId, recipient: id },
        { sender: id, recipient: userId },
      ],
    })
      .populate('sender', 'id email firstName lastName avatar color')
      .populate('recipient', 'id')

    res.status(200).json(
      messages.map((msg) => ({
        id: msg.id,
        sender: {
          id: msg.sender.id,
          email: msg.sender.email,
          firstName: msg.sender.firstName,
          lastName: msg.sender.lastName,
          avatar: msg.sender.avatar,
          color: msg.sender.color,
        },
        recipientId: msg.recipient.id,
        messageType: msg.messageType,
        content: msg.content,
        fileUrl: msg.fileUrl,
      })),
    )
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
