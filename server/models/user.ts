import { model, Schema } from 'mongoose'

import { Color, User } from '~'

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: Color.enum.violet,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const UserModel = model<User>('Users', userSchema)
