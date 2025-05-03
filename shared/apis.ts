export const prefix = '/api'

export const enum AuthApi {
  Signup = '/signup',
  Login = '/login',
  Logout = '/logout',
  ResetPassword = '/reset-password',
}

export const enum UserApi {
  UserInfo = '/user-info',
}

const contactApiBase = '/contacts'
export const enum ContactApi {
  Contacts = `${contactApiBase}`,
  Search = `${contactApiBase}/search`,
}
