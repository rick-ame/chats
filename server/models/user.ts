import { hash } from 'argon2'
import { model, Schema } from 'mongoose'

import { defaultColor, User } from '~/models'

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
      default: defaultColor,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
    return
  }

  this.password = await hash(this.password)

  next()
})

export const UserModel = model<User>('Users', userSchema)
