import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import { ContactApi, ResUser } from '~'

interface ContactStore {
  loading: boolean
  searching: boolean
  contacts: ResUser[] | null
  currentChattingWith: ResUser | null
  fetchDMs: () => Promise<void>
  searchContact: (query: string) => Promise<ResUser[] | undefined>
  chatTo: (user: ResUser) => void
}
export const useContactStore = create<ContactStore>()((set, get) => ({
  loading: false,
  searching: false,

  contacts: null,
  currentChattingWith: null,

  fetchDMs: async () => {
    set({
      contacts: [],
    })
  },

  searchContact: async (query) => {
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
    if (!contacts?.includes(user)) {
      contacts = [user].concat(contacts)
    }
    set({
      currentChattingWith: user,
      contacts,
    })
  },
}))
