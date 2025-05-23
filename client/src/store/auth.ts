import { z } from 'zod'
import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import {
  AuthApi,
  extendedUpdateSchema,
  loginSchema,
  resetPasswordSchema,
  type ResUser,
  signupSchema,
  updateProfileScheme,
  UserApi,
} from '~'

export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>
export type UpdateProfileForm = z.infer<typeof updateProfileScheme>
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

interface AuthStore {
  user: ResUser | null
  checkingAuth: boolean
  loading: boolean

  checkAuth: () => Promise<void>
  login: (values: LoginForm) => Promise<ResUser>
  signup: (values: SignupForm) => Promise<void>
  updateProfile: (values: z.infer<typeof extendedUpdateSchema>) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (values: ResetPasswordForm) => Promise<void>
}
export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  checkAuth: async () => {
    if (get().checkingAuth) {
      try {
        const res = await apiClient.get(UserApi.UserInfo)
        set({
          user: res.data,
          checkingAuth: false,
        })
      } catch (error) {
        set({ checkingAuth: false })
        handleError(error)
      }
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
    } finally {
      set({
        loading: false,
      })
    }
  },

  updateProfile: async (values) => {
    set({ loading: true })
    try {
      const res = await apiClient.post<ResUser>(UserApi.UserInfo, values)
      set({
        user: {
          ...get().user,
          ...res.data,
        },
      })
    } finally {
      set({
        loading: false,
      })
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      await apiClient.post(AuthApi.Logout)
      set({
        user: null,
      })
    } finally {
      set({
        loading: false,
      })
    }
  },

  resetPassword: async (values) => {
    set({ loading: true })
    try {
      await apiClient.post(AuthApi.ResetPassword, values)
    } finally {
      set({
        loading: false,
      })
    }
  },
}))
