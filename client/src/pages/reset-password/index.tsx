import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Lock } from 'lucide-react'
import { FC } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Container, Title } from '@/components/container'
import { MButton, MInput } from '@/components/m-ui'
import { PasswordStrengthMeter } from '@/components/password-strength-meter'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { handleError } from '@/lib/api-client'
import { ResetPasswordForm, useAuthStore } from '@/store'
import { ClientErrorCode, ResError, resetPasswordSchema } from '~'

const ResetPassword: FC = () => {
  const { loading, resetPassword } = useAuthStore()
  const navigate = useNavigate()

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirm: '',
    },
  })

  const password = useWatch({ name: 'password', control: form.control })

  const onSubmit = async (values: ResetPasswordForm) => {
    try {
      await resetPassword(values)
      toast.success('Password updated')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      const errorRes = handleError<ResError>(error)
      if (errorRes?.data.code === ClientErrorCode.OldPasswordIncorrect) {
        form.setError('oldPassword', {
          type: 'custom',
          message: errorRes.data.message,
        })
      }
    }
  }

  return (
    <Container>
      <div className="p-8">
        <header className="relative mb-6">
          <Title>Reset Password</Title>
          <Link
            to="/"
            className="text-primary/90 absolute -start-2 top-1/2 -translate-y-1/2"
          >
            <ArrowLeft className="size-8" />
          </Link>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MInput
                      icon={Lock}
                      type="password"
                      placeholder="Old Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MInput
                      icon={Lock}
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MInput
                      icon={Lock}
                      type="password"
                      placeholder="Retype New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordStrengthMeter password={password} />
            <MButton
              type="submit"
              loading={loading}
              className="w-full font-semibold"
            >
              Save
            </MButton>
          </form>
        </Form>
      </div>
    </Container>
  )
}

export default ResetPassword
