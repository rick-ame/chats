import axios, { AxiosError, AxiosResponse } from 'axios'
import { redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { prefix } from '~'

export const apiClient = axios.create({
  baseURL: prefix,
  timeout: 1000 * 10,
})

export const handleError = <T>(error: unknown) => {
  if (!(error instanceof AxiosError)) {
    toast.error((error as Error).message || String(error))
    return
  }

  if (error.status === 401) {
    redirect('/auth')
    return
  }

  if (error.status && error.status >= 400 && error.status < 500) {
    return error.response as AxiosResponse<T>
  }

  toast.error(error.response?.data?.message || error.message)
}
