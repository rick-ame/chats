import { z } from 'zod'

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
  email: z.string().email('Please input valid email'),
  firstName: z.string().trim().nonempty('First name is required'),
  lastName: z.string().trim().nonempty('Last name is required'),
})
