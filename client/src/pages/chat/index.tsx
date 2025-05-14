import { motion } from 'motion/react'
import { type FC } from 'react'

import { Detail } from './detail'
import { Dialogue } from './dialogue'
import { Nav } from './nav'

const Chat: FC = () => {
  return (
    <div className="w-full px-2 py-4 sm:px-4 lg:px-8 xl:px-12">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-[85dvh] rounded-2xl bg-gray-100/30 shadow-xl backdrop-blur-xl backdrop-filter dark:bg-gray-900/30"
      >
        <div className="grid h-full sm:grid-cols-[3fr_4fr] md:grid-cols-[4fr_5fr_3fr] lg:grid-cols-[2fr_4fr_2fr]">
          <section className="h-full border-e-gray-100 px-4 py-6 sm:border-e dark:border-e-gray-100/50">
            <Nav />
          </section>
          <Dialogue />
          <aside className="hidden justify-center border-s border-s-gray-100 py-6 md:flex dark:border-s-gray-100/50">
            <Detail />
          </aside>
        </div>
      </motion.main>
    </div>
  )
}

export default Chat
