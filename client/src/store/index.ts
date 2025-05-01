import { z } from 'zod'
import { create } from 'zustand'

import { apiClient, handleError } from '@/lib/api-client'
import {
  AuthApi,
  Color,
  loginSchema,
  patchProfileScheme,
  ResUser,
  signupSchema,
  UserApi,
} from '~'

export type LoginForm = z.infer<typeof loginSchema>
export type SignupForm = z.infer<typeof signupSchema>
export type PatchProfileForm = z.infer<typeof patchProfileScheme>

interface AuthStore {
  user: ResUser | null
  isCheckingAuth: boolean
  loading: boolean

  checkAuth: () => Promise<void>
  login: (values: LoginForm) => Promise<ResUser>
  signup: (values: SignupForm) => Promise<void>
  patchProfile: (
    values: PatchProfileForm & { color: Color; avatar?: string },
  ) => Promise<void>
  logout: () => Promise<void>
}
export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
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
    } finally {
      set({
        loading: false,
      })
    }
  },

  patchProfile: async (values) => {
    set({ loading: true })
    try {
      const res = await apiClient.patch<ResUser>(UserApi.UserInfo, values)
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
}))
