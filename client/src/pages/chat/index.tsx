import { LogOut, Plus, Search, ShieldCheck, SquarePen } from 'lucide-react'
import { motion } from 'motion/react'
import { FC } from 'react'
import { Link } from 'react-router'

import { MInput } from '@/components/m-ui'
import { Button } from '@/components/ui/button'
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
          <div className="h-ful flex flex-col border-e-gray-100 py-6 sm:border-e dark:border-e-gray-100/50">
            <section>
              <header className="text-primary flex items-center justify-between px-4">
                <div className="flex items-center">
                  <ChatAvatar />
                  <h3
                    className="w-80px ms-3 truncate font-semibold"
                    title={`${firstName} ${lastName}`}
                  >
                    {firstName}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <SquarePen className="size-5" />
                    <span className="sr-only">Edit Profile</span>
                  </Link>
                  <Link to="/reset-password">
                    <ShieldCheck className="size-5" />
                    <span className="sr-only">Reset Password</span>
                  </Link>
                </div>
              </header>
              <div className="flex items-center justify-between gap-4 p-4">
                <div className="grow-1">
                  <MInput
                    icon={Search}
                    className="rounded-xl"
                    placeholder="Search"
                  />
                </div>
                <Button size="icon">
                  <Plus className="size-6" />
                </Button>
              </div>
            </section>
            <section className="grow-1">contacts</section>
            <footer className="px-4">
              <Button variant="destructive" className="w-full">
                <LogOut className="size-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </footer>
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
