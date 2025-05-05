import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import victory from '@/assets/victory.svg'
import { Container, Title } from '@/components/container'
import { MButton, MInput } from '@/components/m-ui'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { handleError } from '@/lib/api-client'
import { LoginForm, useAuthStore } from '@/store'
import { loginSchema, ResError } from '~'

const Login: FC = () => {
  const { loading, login } = useAuthStore()
  const navigate = useNavigate()

  const form = useForm<LoginForm>({
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
        navigate('/', {
          replace: true,
        })
      } else {
        navigate('/profile', {
          replace: true,
        })
      }
    } catch (error) {
      const errorRes = handleError<ResError>(error)
      if (errorRes) {
        toast.error(errorRes.data.message)
      }
    }
  }

  return (
    <Container>
      <div className="p-8">
        <header className="mb-6 flex items-center justify-center">
          <Title>Welcome Back</Title>
          <img src={victory} alt="Victory Emoji" className="size-[60px]" />
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
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
              className="w-full font-semibold"
            >
              Login
            </MButton>
          </form>
        </Form>
      </div>
      <footer className="bg-primary/5 flex justify-center px-8 py-4">
        <p className="text-foreground/70 text-sm">
          Don't have an account?
          <Link
            to="/signup"
            className="text-primary mx-3 brightness-105 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </footer>
    </Container>
  )
}

export default Login
