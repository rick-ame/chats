import { User } from './models'

export const enum ClientErrorCode {
  EmailRegistered = 4001,
}

export interface ResError {
  code?: ClientErrorCode
  message: string
}

export type ResUser = Omit<User, 'password'> & { id: string }
