import {
  LogOut,
  MessageCircleMore,
  Plus,
  Search,
  ShieldCheck,
  SquarePen,
} from 'lucide-react'
import { FC, lazy, Suspense, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { MButton, MInput } from '@/components/m-ui'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useAuthStore, useContactStore } from '@/store'
import { ResUser } from '~'

import { ChatAvatar } from './components'

const LottieAnimation = lazy(() => import('./lottie-animation'))

export const MainContent: FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { email, avatar, firstName, lastName } = user!

  const { contacts, currentChattingWith, searchContact, searching, chatTo } =
    useContactStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchContacts, setSearchContacts] = useState<ResUser[]>()
  const [open, setOpen] = useState(false)

  const onSearchContact = async () => {
    if (searchQuery && !searching) {
      const data = await searchContact(searchQuery)
      setSearchContacts(data)
    }
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <header>
        <div className="text-primary mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <ChatAvatar
              className="size-10"
              avatar={avatar}
              name={firstName || email}
            />
            <h3
              className="w-80px ms-3 truncate text-xl font-semibold"
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
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="grow-1">
            <MInput
              icon={Search}
              className="rounded-3xl"
              placeholder="Filter"
            />
          </div>
          <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogTrigger asChild>
              <Button size="icon" className="rounded-full">
                <Plus className="size-6" />
                <span className="sr-only">Add Contact</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="border-0 bg-gray-100/80 shadow-xl backdrop-blur-3xl backdrop-filter dark:bg-gray-900/30">
              <DialogHeader>
                <DialogTitle>Search Contact</DialogTitle>
                <DialogDescription className="text-foreground/70">
                  Select a contact to continue
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="mb-2 flex gap-4">
                  <div className="grow-1">
                    <MInput
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.keyCode === 13) {
                          onSearchContact()
                        }
                      }}
                      icon={Search}
                      placeholder="Search"
                    />
                  </div>
                  <MButton onClick={onSearchContact} loading={searching}>
                    <Search />
                    <span className="sr-only">Search Contact</span>
                  </MButton>
                </div>
                <div>
                  {searchContacts ? (
                    <div className="py-4">
                      {searchContacts.length ? (
                        <ScrollArea className="h-72 rounded-md bg-gray-100/60 p-4 dark:bg-gray-700/50">
                          {searchContacts.map((c) => (
                            <div key={c.id}>
                              <div
                                key={c.id}
                                className="items-top flex gap-3 py-3"
                              >
                                <ChatAvatar
                                  name={c.firstName!}
                                  avatar={c.avatar}
                                />
                                <div className="grow-1">
                                  <p>
                                    {c.firstName} {c.lastName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {c.email}
                                  </p>
                                </div>
                                <Button
                                  className="text-primary justify-self-end"
                                  variant="ghost"
                                  onClick={() => {
                                    chatTo(c)
                                    setOpen(false)
                                  }}
                                >
                                  <MessageCircleMore className="size-6" />
                                </Button>
                              </div>
                              <Separator className="bg-primary/50" />
                            </div>
                          ))}
                        </ScrollArea>
                      ) : (
                        <p className="flex items-center justify-center">
                          No Contact Found
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="mt-8 text-center">
                        Hi<span className="text-primary">!</span> Search new{' '}
                        <span className="text-primary">Contact</span>
                      </p>
                      <Suspense fallback={null}>
                        <LottieAnimation />
                      </Suspense>
                    </>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="grow-1">
        <ScrollArea className="h-full rounded-md bg-gray-100/60 p-4 dark:bg-gray-700/30">
          {contacts?.length ? (
            contacts.map((c) => (
              <div key={c.id}>
                <Button
                  variant="ghost"
                  key={c.id}
                  className={cn(
                    'items-top flex w-full justify-start gap-3 rounded-none px-1 py-7',
                    c.id === currentChattingWith?.id &&
                      'bg-primary/60 hover:bg-primary/70',
                  )}
                  onClick={() => {
                    chatTo(c)
                  }}
                >
                  <ChatAvatar name={c.firstName!} avatar={c.avatar} />
                  <div className="text-start">
                    <p>
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{c.email}</p>
                  </div>
                </Button>
                <Separator className="bg-primary/50" />
              </div>
            ))
          ) : (
            <p className="flex items-center justify-center">No Contact</p>
          )}
        </ScrollArea>
      </div>
      <footer>
        <MButton
          className="bg-destructive hover:bg-destructive w-full text-white"
          onClick={async () => {
            await logout()
            toast.info('Logout Successfully')
            setTimeout(() => {
              navigate('/login')
            }, 1000)
          }}
        >
          <LogOut className="size-5" />
          <span className="sr-only">Logout</span>
        </MButton>
      </footer>
    </div>
  )
}
