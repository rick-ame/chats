import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { type FC } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

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
import { type SignupForm, useAuthStore } from '@/store'
import { ClientErrorCode, type ResError, signupSchema } from '~'

const Signup: FC = () => {
  const { loading, signup } = useAuthStore()
  const navigate = useNavigate()

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })

  const password = useWatch({ name: 'password', control: form.control })

  const onSignup = async (values: SignupForm) => {
    try {
      await signup(values)
      navigate('/profile', {
        replace: true,
      })
    } catch (error) {
      const errorRes = handleError<ResError>(error)
      if (errorRes?.data.code === ClientErrorCode.EmailRegistered) {
        form.setError('email', {
          type: 'custom',
          message: errorRes.data.message,
        })
      }
    }
  }

  return (
    <Container>
      <div className="p-8">
        <header className="mb-6">
          <Title>Create Account</Title>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignup)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MInput
                      icon={Mail}
                      type="email"
                      placeholder="Email Address"
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
                      placeholder="Password"
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
                      placeholder="Retype Password"
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
              Sign Up
            </MButton>
          </form>
        </Form>
      </div>
      <footer className="bg-primary/5 flex justify-center px-8 py-4">
        <p className="text-foreground/70 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-primary mx-3 brightness-105 hover:underline"
          >
            Login
          </Link>
        </p>
      </footer>
    </Container>
  )
}

export default Signup
