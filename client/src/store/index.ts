import { z } from 'zod'
import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import { AuthApi, UserApi } from '~/apis'
import { UserRes } from '~/models'
import { loginSchema, signupSchema } from '~/zod-schemas'

export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>

interface AuthStore {
  user?: UserRes
  isCheckingAuth: boolean
  loading: boolean

  checkAuth: () => Promise<void>
  login: (values: LoginForm) => Promise<UserRes>
  signup: (values: SignupForm) => Promise<UserRes>
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
      const res = await apiClient.post<UserRes>(AuthApi.Login, values)
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
      const res = await apiClient.post<UserRes>(AuthApi.Signup, values)
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
