import { verify } from 'argon2'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { JWT_KEY, logger } from '@/lib'
import { UserModel } from '@/models/user'
import { UserRes } from '~/models'
import { loginSchema, signupSchema } from '~/zod-schemas'

const maxAge = 1000 * 60 * 60 * 24 * 3

const createToken = (email: string, userId: string) => {
  return jwt.sign({ email, userId }, JWT_KEY, { expiresIn: maxAge })
}

export const signup: RequestHandler<
  unknown,
  UserRes | { message: string },
  z.infer<typeof signupSchema>,
  unknown,
  object
> = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.create({ email, password })

    logger.info(`created user: ${user.email}`)

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

export const login: RequestHandler<
  unknown,
  UserRes | { message: string },
  z.infer<typeof loginSchema>,
  unknown,
  object
> = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      res.status(400).json({ message: 'Email or password is incorrect' })
      return
    }

    const pwdMatch = await verify(user.password, password)
    if (!pwdMatch) {
      res.status(400).json({ message: 'Email or password is incorrect' })
      return
    }

    logger.info(`user logged in: ${user.email}`)

    res.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    })
    res.status(200).json({
      id: user.id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
