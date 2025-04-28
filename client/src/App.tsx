import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { AUTH, PREFIX } from 'shared/apis'

import { Button } from '@/components/ui/button'

const App: FC = () => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.post(`${PREFIX}${AUTH.signUp}`, {
        username: 'Rick',
      })
      setMsg(data.message)
    })()
  }, [])

  return (
    <div>
      <p className="text-2xl font-bold text-blue-500">{msg}</p>
      <Button>Click Me</Button>
    </div>
  )
}

export default App
