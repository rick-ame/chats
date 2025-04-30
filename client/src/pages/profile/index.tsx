import { ArrowLeft, ImagePlus, X } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@/components/background'
import { MButton } from '@/components/m-button'
import { useColor } from '@/components/providers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { useAuthStore } from '@/store'
import { Color } from '~/models'

const colors = [
  Color.Blue,
  Color.Green,
  Color.Orange,
  Color.Red,
  Color.Rose,
  Color.Violet,
  Color.Yellow,
  // Color.Gray,
]

const Profile: FC = () => {
  const navigate = useNavigate()
  const { setColor } = useColor()
  const { user } = useAuthStore()

  const { email, avatar, firstName, profileSetup } = user!

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
                navigate('/')
              }}
            >
              <ArrowLeft className="size-8" />
              <span className="sr-only">Back</span>
            </div>
          )}
          Profile Information
        </h2>

        <div className="space-y-4">
          <motion.section
            className="bg-primary/20 rounded-lg px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <p className="text-foreground font-medium">Email: {email}</p>
          </motion.section>

          <motion.section
            className="bg-primary/20 rounded-lg px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative mx-auto w-fit">
              <div className="group rounded-full">
                <Avatar
                  className="size-20"
                  onClick={() => {
                    console.log('avatar clicked')
                  }}
                >
                  <AvatarImage src={avatar} alt="Avatar" />
                  <AvatarFallback className="bg-primary/70 text-primary-foreground text-4xl font-bold">
                    {(firstName?.charAt(0) || email.charAt(0)).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  className="text-primary absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center rounded-full bg-black/80 group-hover:flex"
                  onClick={() => {
                    console.log('upload avatar clicked')
                  }}
                >
                  <ImagePlus />
                </button>
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="absolute right-0 top-0 size-6 rounded-full"
                onClick={() => {
                  console.log('remove')
                }}
              >
                <X />
              </Button>
            </div>
          </motion.section>

          <motion.section
            className="rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-3 text-xl font-semibold text-green-400">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {formatDate(Date.now())}
            </p>
          </motion.section>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <MButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/85 hover:bg-primary w-full rounded-lg font-bold shadow-lg"
            onClick={() => {
              const colorIndex = Math.floor(Math.random() * colors.length)
              setColor(colors[colorIndex])
            }}
          >
            {profileSetup ? 'Update' : 'GO!'}
          </MButton>
        </motion.footer>
      </motion.main>
    </Background>
  )
}

export default Profile
