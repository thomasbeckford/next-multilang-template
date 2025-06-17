'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'

const wordsLine1 = [
  'frontend',
  '*',
  'responsive design',
  '*',
  'performance',
  '*',
  'user experience',
  '*',
  'accessibility',
  '*',
  'javascript',
  '*',
  'typescript',
  '*',
  'react',
  '*',
]

const wordsLine2 = [
  'web apps',
  '*',
  'next.js',
  '*',
  'seo optimization',
  '*',
  'ui design',
  '*',
  'tailwind css',
  '*',
  'api integration',
  '*',
  'auth systems',
  '*',
  'cms ready',
  '*',
]

const Marquee = () => {
  const { scrollYProgress } = useScroll()
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-100%', '0%'])

  const renderLine = (words: string[], x: MotionValue<string>) => {
    let realWordCount = 0

    return (
      <motion.div
        className="flex whitespace-nowrap text-4xl font-medium will-change-transform"
        style={{ x }}
      >
        {[...words, ...words].map((word, i) => {
          const isSymbol = word === '*'
          const colorClass = isSymbol
            ? 'text-muted-foreground'
            : realWordCount++ % 2 === 0
            ? 'text-muted-foreground'
            : 'text-primary'

          return (
            <span key={i} className={`mx-4 ${colorClass}`}>
              {word}
            </span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className="overflow-hidden bg-black py-4 mx-auto max-w-full">
      {renderLine(wordsLine1, x1)}
      {renderLine(wordsLine2, x2)}
    </div>
  )
}

export default Marquee
