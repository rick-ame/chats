import { Ellipsis, Plus, Search, SquarePen } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { Link } from 'react-router'

import { MButton, MInput } from '@/components/m-ui'
import { useAuthStore } from '@/store'

import { ChatAvatar } from './chat-avatar'

const Chat: FC = () => {
  const { user } = useAuthStore()
  const { firstName, lastName } = user!

  return (
    <div className="w-full px-2 py-4 sm:px-4 lg:px-8 xl:px-12">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[85dvh] rounded-2xl bg-gray-100/30 shadow-xl backdrop-blur-xl backdrop-filter dark:bg-gray-900/30"
      >
        <div className="grid h-full sm:grid-cols-[3fr_4fr] md:grid-cols-[4fr_5fr_3fr] lg:grid-cols-[2fr_4fr_2fr]">
          <div className="h-ful border-e-gray-100 py-6 sm:border-e dark:border-e-gray-100/50">
            <header className="text-primary flex items-center justify-between px-4">
              <div className="flex items-center">
                <ChatAvatar />
                <p
                  className="w-80px ms-2 truncate font-semibold"
                  title={`${firstName} ${lastName}`}
                >
                  {firstName}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Ellipsis />
                <Link to="/profile">
                  <SquarePen />
                  <span className="sr-only">Edit Profile</span>
                </Link>
              </div>
            </header>
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="grow-1">
                <MInput
                  icon={Search}
                  className="rounded-xl bg-gray-100/50"
                  placeholder="Search"
                />
              </div>
              <MButton>
                <Plus />
                <span className="sr-only">New Message</span>
              </MButton>
            </div>
          </div>
          <div className="hidden sm:flex">Mid</div>
          <aside className="hidden border-s border-s-gray-100 md:flex dark:border-s-gray-100/50">
            Right
          </aside>
        </div>
      </motion.main>
    </div>
  )
}

export default Chat
