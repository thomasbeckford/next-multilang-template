import { useTranslations } from 'next-intl'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'
import HeroGrid from '@/components/HeroGrid'
import { Container } from '@/components/ui/container'
import ScrollMarquee from '@/components/ScrollMarquee'
import AutoMarquee from '@/components/AutoMarquee'
import { MotionHighlight } from '@/components/animate-ui/effects/motion-highlight'
import { iconMap } from '@/lib/iconMap'
import { TypingText } from '@/components/animate-ui/text/typing'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'

export const metadata: Metadata = getMetadata({
  title: 'Home | Next Multilang Template',
  description:
    'This is the homepage of Next Multilang Template, a modern multi-language starter.',
  url: 'https://next-multilang-template.vercel.app',
  image: 'https://next-multilang-template.vercel.app/og-image.jpg',
})

export default function HomePage() {
  const t = useTranslations('HomePage')
  const features = t.raw('featuresList') as {
    title: string
    description: string
    icon: keyof typeof iconMap
  }[]

  return (
    <section id="home" className="md:space-y-20 space-y-6">
      <HeroGrid />

      <Container>
        <AutoMarquee />
      </Container>

      <Container>
        <h2 className="text-3xl font-bold mb-10 text-center">
          <TypingText inView text={`✨ ${t('features')}`} cursor />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MotionHighlight hover className="rounded-xl">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon]
              return (
                <div key={i} className="p-4 flex flex-col border rounded-xl">
                  <AnimateIcon animateOnHover animation="path-loop">
                    <div>
                      <div className="flex items-center justify-around size-10 rounded-lg bg-blue-500/10 mb-2">
                        {Icon && <Icon className="size-5 text-blue-500" />}
                      </div>
                      <p className="text-base font-medium mb-1">
                        {feature.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </AnimateIcon>
                </div>
              )
            })}
          </MotionHighlight>
        </div>
      </Container>

      <ScrollMarquee />
    </section>
  )
}
