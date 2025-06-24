import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'
import getPublicTranslations from '@/lib/translations/getPublicTranslations'

export const metadata: Metadata = getMetadata({
  title: 'About | ClearSpeak',
  description:
    'Learn more about ClearSpeak — an AI-powered platform for multilingual websites.',
  url: 'https://clearkspeak1.app/about',
  image: 'https://clearkspeak1.app/og-image.jpg',
})

// componente server
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { ABOUT_TEXTS } = await getPublicTranslations(locale)

  return (
    <section id="about" className="md:space-y-20 space-y-6">
      <Container className="animate-in fade-in space-y-6">
        <h1 className="text-4xl font-bold">{ABOUT_TEXTS.title}</h1>
        <p className="text-xl text-muted-foreground">{ABOUT_TEXTS.subtitle}</p>
      </Container>

      <Container className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold">
            {ABOUT_TEXTS.section1Title}
          </h2>
          <p className="text-muted-foreground">{ABOUT_TEXTS.section1Body}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {ABOUT_TEXTS.section2Title}
          </h2>
          <p className="text-muted-foreground">{ABOUT_TEXTS.section2Body}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            {ABOUT_TEXTS.section3Title}
          </h2>
          <p className="text-muted-foreground">{ABOUT_TEXTS.section3Body}</p>
        </div>
      </Container>

      <Container>
        <p className="text-center text-lg text-primary font-medium">
          {ABOUT_TEXTS.cta}
        </p>
      </Container>
    </section>
  )
}
