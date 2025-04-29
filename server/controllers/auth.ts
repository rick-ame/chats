import { RequestHandler } from 'express'
import { sign } from 'jsonwebtoken'
import { signupSchema } from 'shared/zod-schemas'
import { z } from 'zod'

import { JWT_KEY, logger } from '@/lib'
import { User, UserModel } from '@/models/user'

const maxAge = 1000 * 60 * 60 * 24 * 3

const createToken = (email: string, userId: string) => {
  return sign({ email, userId }, JWT_KEY, { expiresIn: maxAge })
}

export const signup: RequestHandler<
  unknown,
  (Omit<User, 'password'> & { id: string }) | { message: string },
  z.infer<typeof signupSchema>,
  unknown,
  object
> = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.create({ email, password })

    res.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    })
    res
      .status(201)
      .json({ id: user.id, email: user.email, profileSetup: user.profileSetup })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
