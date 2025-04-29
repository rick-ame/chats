import { Loader2 } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'

import { Button } from '@/components/ui/button'

interface Props {
  loading: boolean
}
const AuthButton: FC<PropsWithChildren<Props>> = ({ loading, children }) => {
  return (
    <Button
      disabled={loading}
      className="w-full bg-purple-600 text-white hover:bg-purple-500"
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  )
}

export default AuthButton
