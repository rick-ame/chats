import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import { UserApi } from '~/apis'
import { UserRes } from '~/models'

interface UserStore {
  userInfo?: UserRes
  loading: boolean
  fetchUserInfo: () => void
  setUserInfo: (user: UserRes) => void
}
export const useUserStore = create<UserStore>()((set, get) => ({
  userInfo: undefined,
  loading: true,
  fetchUserInfo: async () => {
    if (get().userInfo) {
      return
    }
    try {
      const res = await apiClient.get(UserApi.UserInfo)
      set({
        userInfo: res.data,
        loading: false,
      })
    } catch (error) {
      handleError(error)
      set({ loading: false })
    }
  },
  setUserInfo: (user) => {
    set({
      userInfo: user,
    })
  },
}))
