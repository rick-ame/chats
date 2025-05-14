import { type Message, User } from './models'

export const enum ClientErrorCode {
  EmailRegistered = 4001,
  OldPasswordIncorrect = 4002,
}

export interface ResError {
  code?: ClientErrorCode
  message: string
}

export type ResUser = Omit<User, 'password'> & { id: string }

export type ResMessage = Omit<Message, 'sender' | 'recipient'> & {
  id: string
  sender: Omit<ResUser, 'profileSetup'>
  recipientId: string
}
