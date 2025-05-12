import { model, Schema } from 'mongoose'

import { Color, User } from '~'

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
      enum: Color.options,
      required: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

userSchema.pre('findOneAndUpdate', function (next) {
  this.set({
    updatedAt: Date.now(),
  })
  next()
})

export const UserModel = model<User>('users', userSchema)
