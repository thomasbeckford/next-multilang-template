'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import Column from './Column'
import { useTranslations } from 'next-intl'
import useDeviceType, { DeviceType } from '@/hooks/useDeviceType'

export default function HeroGrid() {
  const ref = useRef(null)
  const t = useTranslations('HeroGrid')

  const deviceType = useDeviceType()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 4.1])
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 0])
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.1, 0.4])

  return (
    <section
      ref={ref}
      className="relative md:min-h-[300vh] w-full z-[-1] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="z-10 text-center w-4/5 my-16 px-8 relative">
          <h1 className="text-[clamp(3rem,6vw,4.5rem)] leading-[clamp(4rem,7vw,5rem)] font-bold max-w-4xl mx-auto text-shadow-md text-shadow-black">
            {t.rich('title', {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>
        </div>

        <motion.div
          className="absolute flex gap-[3px] items-center justify-center"
          style={{
            scale,
            rotateZ: deviceType === DeviceType.Mobile ? 0 : rotate,
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
