import { hash, verify } from 'argon2'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { JWT_KEY, logger } from '@/lib'
import { Locals } from '@/middlewares'
import { UserModel } from '@/models/user'
import {
  ClientErrorCode,
  loginSchema,
  ResError,
  resetPasswordSchema,
  ResUser,
  signupSchema,
} from '~'

const maxAge = 1000 * 60 * 60 * 24 * 3

const createToken = (email: string, userId: string) => {
  return jwt.sign({ email, userId }, JWT_KEY, { expiresIn: maxAge })
}

export const signup: RequestHandler<
  unknown,
  ResUser | ResError,
  z.infer<typeof signupSchema>
> = async (req, res) => {
  try {
    const { email, password } = req.body

    const found = await UserModel.findOne({ email })
    if (found) {
      res.status(400).json({
        code: ClientErrorCode.EmailRegistered,
        message: 'Email has been registered',
      })
      return
    }

    const user = await UserModel.create({
      email,
      password: await hash(password),
    })

    logger.info(`created user: ${user.email}`)

    res.cookie('jwt', createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    })
    res.status(201).json({
      id: user.id,
      email: user.email,
      color: user.color,
      profileSetup: user.profileSetup,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const login: RequestHandler<
  unknown,
  ResUser | ResError,
  z.infer<typeof loginSchema>
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
      avatar: user.avatar,
      color: user.color,
    })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout: RequestHandler<unknown, { message: string }> = async (
  req,
  res,
) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 1,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    })
    res.status(200).json({
      message: 'Logout Successfully',
    })
  } catch (error) {
    logger.error(error)

    res.json({
      message: 'Internal server error',
    })
  }
}

export const resetPassword: RequestHandler<
  unknown,
  ResError,
  z.infer<typeof resetPasswordSchema>,
  unknown,
  Locals
> = async (req, res) => {
  try {
    const userId = res.locals.userId
    const { oldPassword, password } = req.body

    const found = await UserModel.findById(userId)
    if (!found) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const pwdMatch = await verify(found.password, oldPassword)
    if (!pwdMatch) {
      res.status(400).json({
        code: ClientErrorCode.OldPasswordIncorrect,
        message: 'Password is incorrect',
      })
      return
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        password: await hash(password),
      },
      {
        new: true,
      },
    )

    logger.info(`user reset password: ${user?.email || found.email}`)

    res.status(200).json({ message: 'Password updated' })
  } catch (error) {
    logger.error(error)

    res.status(500).json({ message: 'Internal Server Error' })
  }
}
