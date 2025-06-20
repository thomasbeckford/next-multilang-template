'use client'

import { motion, MotionValue } from 'motion/react'
import VideoBlock from './VideoBlock'
import Image from 'next/image'

type Props = {
  includeVideo?: boolean
  opacity: MotionValue<number>
  images: string[]
}

export default function Column({
  includeVideo = false,
  opacity,
  images,
}: Props) {
  return (
    <motion.div className="flex flex-col gap-[3px]" style={{ opacity }}>
      <ImageBlock src={images[0]} alt="1" />
      {includeVideo ? <VideoBlock /> : <ImageBlock src={images[1]} alt="2" />}
      <ImageBlock src={images[2]} alt="3" />
    </motion.div>
  )
}

function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="w-full h-auto object-cover"
      priority
      quality={50}
    />
  )
}
