import { Server } from 'node:http'

import { Server as SocketIOServer } from 'socket.io'

import { Message, ResMessage, SocketEvent } from '~'

import { logger } from './lib'
import { MessageModel } from './models/message'

export const setupSocket = (server: Server) => {
  const io = new SocketIOServer(server)

  const userSocketMap = new Map<string, string>()

  const onSendMessage = async (message: Message) => {
    const senderSocketId = userSocketMap.get(message.sender)
    const recipientSocketId = userSocketMap.get(message.recipient)

    const createdMessage = await MessageModel.create(message)

    const messageData = await MessageModel.findById<
      Omit<ResMessage, 'recipientId'> & {
        recipient: {
          id: string
        }
      }
    >(createdMessage.id)
      .populate('sender', 'id email firstName lastName avatar color')
      .populate('recipient', 'id')

    const { id, sender, recipient, messageType, content, fileUrl } =
      messageData!

    const res: ResMessage = {
      id,
      sender: {
        id: sender.id,
        email: sender.email,
        firstName: sender.firstName,
        lastName: sender.lastName,
        avatar: sender.avatar,
        color: sender.color,
      },
      recipientId: recipient.id,
      messageType,
      content,
      fileUrl,
    }

    if (recipientSocketId) {
      io.to(recipientSocketId).emit(SocketEvent.ReceiveMessage, res)
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit(SocketEvent.ReceiveMessage, res)
    }
  }

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string
    if (userId) {
      userSocketMap.set(userId, socket.id)

      logger.info(`User connected: ${userId} with socket ID: ${socket.id}`)
    } else {
      logger.error('User ID not provided during connection with socket io')
    }

    socket.on('disconnect', () => {
      for (const [userId, socketId] of userSocketMap) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId)
        }
      }

      logger.info(`Client: ${userId} disconnected with: ${socket.id}`)
    })

    socket.on(SocketEvent.SendMessage, onSendMessage)
  })

  logger.info('Socket IO server running!')
}
