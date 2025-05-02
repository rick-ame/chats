import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Lock } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

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
import { ResetPasswordForm, useAuthStore } from '@/store'
import { resetPasswordSchema } from '~'

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
      handleError(error)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-background/30 w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 p-8 shadow-2xl backdrop-blur-xl backdrop-filter"
    >
      <h2 className="text-primary/90 relative mb-6 bg-clip-text text-center text-3xl font-bold">
        <Link to="/" className="absolute -left-2 top-1/2 -translate-y-1/2">
          <ArrowLeft className="size-8" />
        </Link>
        Reset Password
      </h2>
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
            Save
          </MButton>
        </form>
      </Form>
    </motion.main>
  )
}

export default ResetPassword
