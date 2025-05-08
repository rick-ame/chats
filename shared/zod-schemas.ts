import { z } from 'zod'

import { Color } from './models'

export const loginSchema = z.object({
  email: z.string().email('Please input valid email'),
  password: z
    .string()
    .nonempty('Please input password')
    .min(6, 'Password length cannot be less than 6'),
})

export const signupSchema = loginSchema
  .extend({
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Please input same password',
  })

export const updateProfileScheme = z.object({
  email: z.string().email('Please input valid email').optional(),
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
})
export const extendedUpdateSchema = updateProfileScheme.extend({
  color: Color.optional(),
  avatar: z.string().optional(),
})

export const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .nonempty('Please input old password')
      .min(6, 'Password length cannot be less than 6'),
    password: z
      .string()
      .nonempty('Please input new password')
      .min(6, 'Password length cannot be less than 6'),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ['confirm'],
    message: 'Please input same password',
  })

export const searchContactsSchema = z.object({
  searchTerm: z.string().trim().nonempty('Search term is required'),
})
