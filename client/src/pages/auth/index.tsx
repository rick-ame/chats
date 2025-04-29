import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthApi } from 'shared/apis'
import { loginSchema, signupSchema } from 'shared/zod-schemas'
import { z } from 'zod'

import login from '@/assets/login.png'
import victory from '@/assets/victory.svg'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { apiClient, handleError } from '@/lib/api-client'

import AuthButton from './auth-button'

type LoginForm = z.infer<typeof loginSchema>
type SignupForm = z.infer<typeof signupSchema>

const Auth: FC = () => {
  const [loading, setLoading] = useState(false)

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onLogin = async (values: LoginForm) => {
    console.log(values)
  }

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })
  const onSignup = async (values: SignupForm) => {
    try {
      setLoading(true)
      const res = await apiClient.post(AuthApi.Signup, values)

      console.log(res)
    } catch (error) {
      handleError<{ body: SignupForm }>(error, (errorData) => {
        const { body } = errorData.format()
        Object.keys(values).forEach((key) => {
          const msg = body![key as keyof SignupForm]?._errors[0]
          if (msg) {
            signupForm.setError(key as keyof SignupForm, {
              type: 'zod',
              message: msg,
            })
          }
        })
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-foreground/90 grid min-h-[80vh] w-[90vw] rounded-3xl border-2 border-white bg-white p-10 shadow-2xl md:w-[80vw] lg:w-[70vw] xl:w-[60vw] xl:grid-cols-2 dark:border-black dark:bg-gray-900">
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                Welcome
              </h1>
              <img
                src={victory}
                alt="Victory Emoji"
                className="h-[80px] sm:h-[100px]"
              />
            </div>
            <p className="text-center font-medium">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex justify-center">
            <Tabs defaultValue="login" className="h-[265px] w-full sm:w-3/4">
              <TabsList className="w-full bg-transparent">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:border-b-purple-500! bg-transparent! rounded-b-none border-b-2 p-3 data-[state=active]:font-semibold"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:border-b-purple-500! bg-transparent! rounded-b-none border-b-2 p-3 data-[state=active]:font-semibold"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="pt-4">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLogin)}
                    className="space-y-5"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              type="email"
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
                            <Input
                              placeholder="Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AuthButton loading={loading}>Log In</AuthButton>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="signup" className="pt-4">
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(onSignup)}
                    className="space-y-5"
                  >
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Confirm Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <AuthButton loading={loading}>Sign Up</AuthButton>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden items-center justify-center xl:flex">
          <img src={login} alt="Login Background" className="h-[500px]" />
        </div>
      </div>
    </div>
  )
}

export default Auth
