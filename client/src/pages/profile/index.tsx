import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader, Mail, SquareUser } from 'lucide-react'
import { motion } from 'motion/react'
import { FC, useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { Background } from '@/components/background'
import { MButton } from '@/components/m-button'
import { MInput } from '@/components/m-input'
import { useThemeColor } from '@/components/providers'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { handleError } from '@/lib/api-client'
import { PatchProfileForm, useAuthStore } from '@/store'
import { Color, patchProfileScheme } from '~'

import { ColorOption } from './color-option'
import { ProfileAvatar } from './profile-avatar'

const colors = Color.options

const Profile: FC = () => {
  const navigate = useNavigate()
  const { user, loading, patchProfile } = useAuthStore()

  const {
    email,
    avatar = '',
    firstName = '',
    profileSetup,
    lastName = '',
    color: userColor,
  } = user!

  const { color, setColor } = useThemeColor()
  const revertColorRef = useRef(true)

  const [image, setImage] = useState(avatar)

  const form = useForm<PatchProfileForm>({
    resolver: zodResolver(patchProfileScheme),
    defaultValues: {
      email,
      firstName,
      lastName,
    },
  })

  const fieldFirstName = useWatch({ name: 'firstName', control: form.control })

  const onSubmit = async (values: PatchProfileForm) => {
    try {
      await patchProfile({
        ...values,
        color,
        avatar: avatar === image ? undefined : image,
      })
      revertColorRef.current = false
      toast.success('Profile updated')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      const errorRes = handleError(error)
      if (errorRes?.status === 413) {
        toast.error('Image size cannot be greater than 500K')
      }
    }
  }

  useEffect(() => {
    return () => {
      if (revertColorRef.current) {
        setColor(userColor)
      }
    }
  }, [setColor, userColor])

  return (
    <Background>
      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="dark:bg-background/30 bg-secondary/50 w-full max-w-md rounded-xl p-8 shadow-2xl backdrop-blur-lg backdrop-filter"
      >
        <h2 className="text-primary/90 relative mb-6 bg-clip-text text-center text-3xl font-bold">
          {profileSetup && (
            <div
              className="absolute -left-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                navigate(-1)
              }}
            >
              <ArrowLeft className="size-8" />
              <span className="sr-only">Back</span>
            </div>
          )}
          Profile Information
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <motion.section
              className="bg-primary/20 rounded-lg px-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProfileAvatar
                name={fieldFirstName || email}
                image={image}
                setImage={setImage}
              />
              <div className="mt-4 grid grid-cols-4 gap-2">
                {colors.map((c, i) => (
                  <ColorOption key={i} color={c} />
                ))}
              </div>
            </motion.section>

            <motion.section
              className="bg-primary/20 rounded-lg px-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="space-y-6">
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MInput
                          icon={SquareUser}
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MInput
                          icon={SquareUser}
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.section>

            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/85 hover:bg-primary w-full rounded-lg font-bold shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="mx-auto h-6 w-6 animate-spin" />
                ) : profileSetup ? (
                  'Update'
                ) : (
                  'GO!'
                )}
              </MButton>
            </motion.footer>
          </form>
        </Form>
      </motion.main>
    </Background>
  )
}

export default Profile
