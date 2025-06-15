import { useTranslations } from 'next-intl'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'
import HeroGrid from '@/components/HeroGrid'
import { Container } from '@/components/ui/container'
import ScrollMarquee from '@/components/ScrollMarquee'
import AutoMarquee from '@/components/AutoMarquee'

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
  }[]

  return (
    <section id="home" className="space-y-20  ">
      <HeroGrid />

      <Container>
        <AutoMarquee />
      </Container>

      <Container
        variant="constrainedPadded"
        className="animate-in fade-in bg-secondary text-secondary-foreground"
      >
        <h2 className="text-3xl font-bold mb-10">✨ {t('features')}</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium ">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>

      <ScrollMarquee />

      <Container
        variant="breakpointPadded"
        className="animate-in fade-in bg-secondary text-secondary-foreground"
      >
        <h2 className="text-3xl font-bold mb-10">✨ {t('features')}</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium ">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>

      <Container
        variant="breakpointPadded"
        className="animate-in fade-in bg-secondary text-secondary-foreground"
      >
        <h2 className="text-3xl font-bold mb-10">✨ {t('features')}</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium ">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
