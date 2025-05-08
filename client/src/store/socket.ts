import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

import { SocketEvent } from '~'

interface SocketStore {
  socket: Socket | null
  connect: (userId: string) => void
  disconnect: () => void
}
export const useSocketStore = create<SocketStore>()((set, get) => ({
  socket: null,

  connect: (userId) => {
    const socket = io({
      query: {
        userId,
      },
    })
    socket.on('connect', () => {
      set({
        socket,
      })
    })

    const onReceiveMessage = () => {}

    socket.on(SocketEvent.ReceiveMessage, onReceiveMessage)
  },

  disconnect: () => {
    get().socket?.disconnect()
    set({
      socket: null,
    })
  },
}))
