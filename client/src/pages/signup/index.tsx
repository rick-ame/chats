import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { MButton } from '@/components/m-button'
import { MInput } from '@/components/m-input'
import { PasswordStrengthMeter } from '@/components/password-strength-meter'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { handleError } from '@/lib/api-client'
import { SignupForm, useAuthStore } from '@/store'
import { ClientErrorCode, ResError, signupSchema } from '~'

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
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-background/30 w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 shadow-2xl backdrop-blur-xl backdrop-filter"
    >
      <div className="p-8">
        <h2 className="from-primary via-primary/80 to-primary mb-6 bg-gradient-to-br bg-clip-text text-center text-3xl font-bold text-transparent">
          Create Account
        </h2>
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
                      placeholder="Confirm Password"
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
      <div className="bg-primary/5 flex justify-center px-8 py-4">
        <p className="text-foreground/70 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-primary mx-3 brightness-105 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.main>
  )
}

export default Signup
