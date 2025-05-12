import { io, Socket } from 'socket.io-client'
import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import { ContactApi, Message, ResMessage, ResUser, SocketEvent } from '~'

interface ContactStore {
  setup: boolean
  loading: boolean
  searching: boolean
  _socket: Socket | null
  contacts: Omit<ResUser, 'profileSetup'>[] | null
  currentChattingWith: Omit<ResUser, 'profileSetup'> | null
  messagesMap: Map<string, ResMessage[]>
  messages: ResMessage[] | null
  init: (userId: string) => Promise<void>
  cleanup: () => void
  send: (message: Message) => void
  searchContacts: (
    query: string,
  ) => Promise<Omit<ResUser, 'profileSetup'>[] | undefined>
  chatTo: (user: Omit<ResUser, 'profileSetup'>) => void
  close: () => void
}
export const useContactStore = create<ContactStore>()((set, get) => ({
  setup: true,
  loading: false,
  searching: false,

  _socket: null,

  contacts: null,
  currentChattingWith: null,

  messagesMap: new Map(),
  messages: null,

  init: async (userId) => {
    if (get().setup) {
      try {
        const socket = io({
          query: {
            userId,
          },
        })
        const res = await apiClient.get(ContactApi.Contacts)
        set({
          _socket: socket,
          contacts: res.data,
          setup: false,
        })

        socket.on(SocketEvent.ReceiveMessage, (messageData: ResMessage) => {
          const id =
            messageData.sender.id === userId
              ? messageData.recipientId
              : messageData.sender.id
          const messagesMap = get().messagesMap
          const messages = [...(messagesMap.get(id) || []), messageData]
          messagesMap.set(id, messages)
          if (get().currentChattingWith?.id === id) {
            set({
              messages,
              messagesMap,
            })
          } else {
            set({
              messagesMap,
            })
            if (
              messageData.recipientId === userId &&
              !get().contacts?.find((c) => c.id === messageData.sender.id)
            ) {
              set({
                contacts: [messageData.sender, ...(get().contacts || [])],
              })
            }
          }
        })
      } catch (error) {
        set({
          setup: false,
        })
        handleError(error)
      }
    }
  },

  cleanup: () => {
    get()._socket?.disconnect()
    set({
      _socket: null,
    })
  },

  send: (message) => {
    get()._socket?.emit(SocketEvent.SendMessage, message)
  },

  searchContacts: async (query) => {
    set({
      searching: true,
    })
    try {
      const res = await apiClient.get<ResUser[]>(ContactApi.Search, {
        params: { searchTerm: query },
      })
      return res.data
    } catch (error) {
      handleError(error)
    } finally {
      set({
        searching: false,
      })
    }
  },

  chatTo: async (user) => {
    let contacts = get().contacts || []
    if (!contacts?.find((c) => c.id === user.id)) {
      contacts = [user].concat(contacts)
    }
    const messagesMap = get().messagesMap
    if (!messagesMap.get(user.id)) {
      try {
        const res = await apiClient.get(`${ContactApi.Messages}/${user.id}`)
        messagesMap.set(user.id, res.data)
        set({
          currentChattingWith: user,
          contacts,
          messagesMap,
          messages: messagesMap.get(user.id),
        })
      } catch (error) {
        handleError(error)
      }
    } else {
      set({
        currentChattingWith: user,
        contacts,
        messages: messagesMap.get(user.id),
      })
    }
  },

  close: () => {
    set({
      currentChattingWith: null,
      messages: null,
    })
  },
}))
