import axios, { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'
import { prefix } from 'shared/apis'
import { toast } from 'sonner'
import { z } from 'zod'

export const apiClient = axios.create({
  baseURL: prefix,
  timeout: 1000 * 20,
})

type ClientErrorHandler<T> = (errorData: z.ZodError<T>) => void
export const handleError = <T>(
  error: unknown,
  clientErrorHandler: ClientErrorHandler<T>,
) => {
  if (error instanceof AxiosError) {
    const {
      response: { data },
    } = error as {
      response: {
        data: z.ZodError<T>
      }
    }
    if (error.status === 400) {
      if (data.name === 'ZodError') {
        clientErrorHandler(new z.ZodError(data.issues))
      } else {
        toast(error.message)
      }
    } else if (error.status === 401) {
      redirect('/auth')
    }
  } else {
    toast((error as Error).message || String(error))
  }
}
