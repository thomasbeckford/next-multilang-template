'use client'
import { useTranslations } from 'next-intl'

export default function VideoBlock() {
  const t = useTranslations('VideoBackground')
  return (
    <div className="relative w-full h-auto aspect-video overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-top z-[-1] "
      >
        <source
          src="https://videos.pexels.com/video-files/5527786/5527786-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
