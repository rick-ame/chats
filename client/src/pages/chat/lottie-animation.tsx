import { useLottie } from 'lottie-react'
import { FC } from 'react'

import lottieData from '@/assets/lottie.json'

const LottieAnimation: FC = () => {
  const { View } = useLottie({
    animationData: lottieData,
  })

  return <div className="p-12 opacity-15">{View}</div>
}

export default LottieAnimation
