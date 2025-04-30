import axios, { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'
import { toast } from 'sonner'

import { prefix } from '~/apis'

export const apiClient = axios.create({
  baseURL: prefix,
  timeout: 1000 * 20,
})

export const handleError = <ClientError>(
  error: unknown,
): ClientError | undefined => {
  if (!(error instanceof AxiosError)) {
    toast.error((error as Error).message || String(error))
    return
  }

  if (error.status === 400) {
    return error.response?.data
  }

  if (error.status === 401) {
    redirect('/auth')
    return
  }

  toast.error(error.response?.data?.message || error.message)
}
