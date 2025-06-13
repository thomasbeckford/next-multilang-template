'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

const TrackScroll = () => {
  const { scrollYProgress } = useScroll()

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ['#6d4ae5', '#16a34a']
  )

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        originX: 0,
        background,
      }}
      className="fixed left-0 top-0 h-2 w-screen"
    />
  )
}

export default TrackScroll
