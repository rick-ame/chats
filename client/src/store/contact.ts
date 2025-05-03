import { create } from 'zustand'

import { handleError } from '@/lib/api-client'

const mockSearch = () => {
  return new Promise<unknown[]>((resolve) => {
    setTimeout(() => {
      resolve([])
    }, 1000)
  })
}

interface ContactStore {
  loading: boolean
  searching: boolean
  fetchDMs: () => Promise<void>
  searchContact: (query: string) => Promise<unknown[] | undefined>
}
export const useContactStore = create<ContactStore>()((set) => ({
  loading: false,
  searching: false,

  fetchDMs: async () => {
    return
  },

  searchContact: async (query) => {
    set({
      searching: true,
    })
    try {
      console.log(query)
      return await mockSearch()
    } catch (error) {
      handleError(error)
    } finally {
      set({
        searching: false,
      })
    }
  },
}))
