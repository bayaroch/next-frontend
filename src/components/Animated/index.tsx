/* eslint-disable @typescript-eslint/no-unused-vars */
import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren } from 'react'

interface AnimatedProps {
  order: number
  delay?: number
}

const Animated: React.FC<AnimatedProps & PropsWithChildren> = ({
  order,
  delay,
  children,
  ...rest
}) => {
  const springs = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    reset: false,
    delay: delay ? delay : order * 200,
    ...rest,
  })

  return <animated.div style={springs}>{children}</animated.div>
}

export default Animated
