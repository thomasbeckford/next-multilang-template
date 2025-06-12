import { useTranslations } from 'next-intl'

const VideoBackground = () => {
  const t = useTranslations('VideoBackground')

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-top z-[-1] opacity-60"
      >
        <source src="/moto.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex items-center justify-center h-full text-white z-10 relative">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl">{t('subtitle')}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoBackground
