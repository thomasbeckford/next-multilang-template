'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import Column from './Column'
import { useTranslations } from 'next-intl'

export default function HeroGrid() {
  const ref = useRef(null)
  const t = useTranslations('HeroGrid')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 4])
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.6])

  return (
    <section
      ref={ref}
      className="relative min-h-[300vh] w-full z-[-1] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 text-center w-4/5 my-16 px-8 relative">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
        </div>

        <motion.div
          className="absolute flex gap-[3px] items-center justify-center"
          style={{
            scale,
            rotateZ: rotate,
          }}
        >
          <Column
            opacity={opacity}
            images={[
              '/hero-grid/abstract.jpg',
              '/hero-grid/futuristic.jpeg',
              '/hero-grid/hero-back.jpg',
            ]}
          />
          <Column
            includeVideo
            opacity={opacity}
            images={[
              '/hero-grid/red-blue.jpeg',
              '/hero-grid/webdesigners.jpg',
              '/hero-grid/red-blue.jpeg',
            ]}
          />
          <Column
            opacity={opacity}
            images={[
              '/hero-grid/website-traffic.jpg',
              '/hero-grid/abstract.jpg',
              '/hero-grid/futuristic.jpeg',
            ]}
          />
        </motion.div>
      </div>
    </section>
  )
}
