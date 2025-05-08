import { Server } from 'node:http'

import { Server as SocketIOServer } from 'socket.io'

import { Message, SocketEvent } from '~'

import { logger } from './lib'
import { MessageModel } from './models/message'

export const setupSocket = (server: Server) => {
  const io = new SocketIOServer(server)

  const userSocketMap = new Map<string, string>()

  const onSendMessage = async (message: Message) => {
    const senderSocketId = userSocketMap.get(message.sender)
    const recipientSocketId =
      message.recipient && userSocketMap.get(message.recipient)

    const createdMessage = await MessageModel.create(message)

    const messageData = await MessageModel.findById(createdMessage._id)
      .populate('sender', 'id email firstName lastName image color')
      .populate('recipient', 'id email firstName lastName image color')

    if (recipientSocketId) {
      io.to(recipientSocketId).emit(SocketEvent.ReceiveMessage, messageData)
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit(SocketEvent.ReceiveMessage, messageData)
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
}
