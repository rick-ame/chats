export const enum ClientErrorCode {
  EmailRegistered = 4001,
}

export interface ResError {
  code?: ClientErrorCode
  message: string
}
