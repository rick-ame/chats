import { hash } from 'argon2'
import { model, Schema } from 'mongoose'

export interface User {
  email: string
  password: string
  firstName?: string
  lastName?: string
  image?: string
  color?: number
  profileSetup: boolean
}

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
    image: {
      type: String,
      required: false,
    },
    color: {
      type: Number,
      required: false,
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
    return next()
  }
  this.password = await hash(this.password)
  next()
})

export const UserModel = model<User>('Users', userSchema)
