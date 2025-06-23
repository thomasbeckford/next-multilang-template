import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'
import { Locale } from '@/lib/constants'
import { translateWithCache } from '@/lib/translations/translateWithCache'

export const metadata: Metadata = getMetadata({
  title: 'About | ClearSpeak',
  description:
    'Learn more about ClearSpeak — an AI-powered platform for multilingual websites.',
  url: 'https://clearkspeak1.app/about',
  image: 'https://clearkspeak1.app/og-image.jpg',
})

// contenido original
const ABOUT_TEXTS = {
  title: 'About Us',
  subtitle: 'Learn how ClearSpeak is building a multilingual web.',
  section1Title: 'Our Vision',
  section1Body:
    'We believe that language should not be a barrier to access information.',
  section2Title: 'Our Technology',
  section2Body:
    'We use cutting-edge AI to deliver fast and accurate translations.',
  section3Title: 'Our Team',
  section3Body:
    'We are a team of developers, linguists, and designers with a shared goal.',
  cta: 'Want to work with us? Get in touch!',
}

// traducción + cache
async function getTranslatedAboutContent(locale: Locale) {
  const flatContent = ABOUT_TEXTS

  const { data } = await translateWithCache({
    locale,
    updatedAt: 'about_page',
    content: flatContent,
  })

  return data
}

// componente server
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const t = await getTranslatedAboutContent(locale)

  return (
    <section id="about" className="md:space-y-20 space-y-6">
      <Container className="animate-in fade-in space-y-6">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
      </Container>

      <Container className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold">{t.section1Title}</h2>
          <p className="text-muted-foreground">{t.section1Body}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t.section2Title}</h2>
          <p className="text-muted-foreground">{t.section2Body}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{t.section3Title}</h2>
          <p className="text-muted-foreground">{t.section3Body}</p>
        </div>
      </Container>

      <Container>
        <p className="text-center text-lg text-primary font-medium">{t.cta}</p>
      </Container>
    </section>
  )
}
