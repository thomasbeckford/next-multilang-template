import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'About | ClearSpeak',
  description:
    'Learn more about ClearSpeak — an AI-powered platform for multilingual websites.',
  url: 'https://clearspeak.app/about',
  image: 'https://clearspeak.app/og-image.jpg',
})

export default function AboutPage() {
  const t = useTranslations('About')

  return (
    <section id="about" className="md:space-y-20 space-y-6">
      <Container className="animate-in fade-in space-y-6">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle')}</p>
      </Container>

      <Container className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold">{t('section1Title')}</h2>
          <p className="text-muted-foreground">{t('section1Body')}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t('section2Title')}</h2>
          <p className="text-muted-foreground">{t('section2Body')}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t('section3Title')}</h2>
          <p className="text-muted-foreground">{t('section3Body')}</p>
        </div>
      </Container>

      <Container>
        <p className="text-center text-lg text-primary font-medium">
          {t('cta')}
        </p>
      </Container>
    </section>
  )
}
