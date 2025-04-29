import axios, { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'
import { prefix } from 'shared/apis'
import { toast } from 'sonner'
import { z } from 'zod'

export const apiClient = axios.create({
  baseURL: prefix,
  timeout: 1000 * 20,
})

type ClientErrorHandler<T, U> = (errorData: z.ZodError<T> | U) => void
export const handleError = <TZodError, TClientError = Record<string, string>>(
  error: unknown,
  clientErrorHandler?: ClientErrorHandler<TZodError, TClientError>,
) => {
  if (!(error instanceof AxiosError) || !error.response) {
    toast.error((error as Error).message || String(error))
    return
  }

  const data = error.response.data as z.ZodError<TZodError> | TClientError

  if (error.status === 400 && clientErrorHandler) {
    let errorData = data
    if ((data as z.ZodError<TZodError>).name === 'ZodError') {
      errorData = new z.ZodError((data as z.ZodError<TZodError>).issues)
    }
    clientErrorHandler(errorData)
    return
  }

  if (error.status === 401) {
    redirect('/auth')
    return
  }

  toast.error(error.message)
}
