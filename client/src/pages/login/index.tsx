import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import victory from '@/assets/victory.svg'
import { MButton } from '@/components/m-button'
import { MInput } from '@/components/m-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { handleError } from '@/lib/api-client'
import { LoginForm, useAuthStore } from '@/store'
import { ResError } from '~/response-error'
import { loginSchema } from '~/zod-schemas'

const Login: FC = () => {
  const { loading, login } = useAuthStore()
  const navigate = useNavigate()

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onLogin = async (values: LoginForm) => {
    try {
      const { profileSetup } = await login(values)
      if (profileSetup) {
        navigate('/')
      } else {
        navigate('/profile')
      }
    } catch (error) {
      const errorData = handleError<ResError>(error)
      if (errorData) {
        toast.error(errorData.message)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dark:bg-background/30 mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 shadow-2xl backdrop-blur-xl backdrop-filter"
    >
      <div className="p-8">
        <header className="mb-6 flex items-center justify-center">
          <h2 className="from-primary via-primary/80 to-primary mx-2 bg-gradient-to-br bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl">
            Welcome Back
          </h2>
          <img src={victory} alt="Victory Emoji" className="size-[60px]" />
        </header>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="space-y-6"
          >
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
            {/* <div className="mb-6 flex items-center">
              <Link
                to="/forgot-password"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div> */}
            <MButton
              type="submit"
              loading={loading}
              className="w-full font-semibold text-white"
            >
              Login
            </MButton>
          </form>
        </Form>
      </div>
      <div className="bg-primary/5 flex justify-center px-8 py-4">
        <p className="text-foreground/70 text-sm">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary mx-3 brightness-105 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
export default Login
