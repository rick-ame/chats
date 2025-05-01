import { z } from 'zod'
import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import { AuthApi, loginSchema, ResUser, signupSchema, UserApi } from '~'

export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>

interface AuthStore {
  user?: ResUser
  isCheckingAuth: boolean
  loading: boolean

  checkAuth: () => Promise<void>
  login: (values: LoginForm) => Promise<ResUser>
  signup: (values: SignupForm) => Promise<ResUser>
}
export const useAuthStore = create<AuthStore>()((set) => ({
  userInfo: undefined,
  loading: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await apiClient.get(UserApi.UserInfo)
      set({
        user: res.data,
        isCheckingAuth: false,
      })
    } catch (error) {
      set({ isCheckingAuth: false })
      handleError(error)
    }
  },

  login: async (values) => {
    set({ loading: true })
    try {
      const res = await apiClient.post<ResUser>(AuthApi.Login, values)
      set({
        user: res.data,
      })
      return res.data
    } finally {
      set({
        loading: false,
      })
    }
  },

  signup: async (values) => {
    set({ loading: true })
    try {
      const res = await apiClient.post<ResUser>(AuthApi.Signup, values)
      set({
        user: res.data,
      })
      return res.data
    } finally {
      set({
        loading: false,
      })
    }
  },
}))
