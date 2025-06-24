import { type Metadata } from 'next'

import { translateWithCache } from '@/lib/translations/translateWithCache'
import getMetadata from '@/lib/seo'
import HeroGrid from '@/components/HeroGrid'
import { Container } from '@/components/ui/container'
import ScrollMarquee from '@/components/ScrollMarquee'
import AutoMarquee from '@/components/AutoMarquee'
import Features from '@/components/Features'
import { HOMEPAGE_TEXTS } from '@/i18n/messages/HomePage'
import { wordsLine1, wordsLine2 } from '@/i18n/messages/Marquee'

export const metadata: Metadata = getMetadata({
  title: 'Home | ClearSpeak',
  description:
    'This is the homepage of ClearSpeak, a modern multi-language starter.',
  url: 'https://clearkspeak1.vercel.app',
  image: 'https://clearkspeak1.vercel.app/og-image.jpg',
})

async function getTranslatedContent(locale: string, updatedAt: string) {
  const flatContent = {
    'homePage.hero.title': HOMEPAGE_TEXTS.title,
    'homePage.features.label': HOMEPAGE_TEXTS.features,
    ...Object.fromEntries(
      HOMEPAGE_TEXTS.featuresList.flatMap((item, i) => [
        [`homePage.features.list.${i}.title`, item.title],
        [`homePage.features.list.${i}.description`, item.description],
      ])
    ),
  }

  const { data } = await translateWithCache({
    locale,
    updatedAt,
    content: flatContent,
  })

  const featuresList = HOMEPAGE_TEXTS.featuresList.map((item, i) => ({
    title: data[`homePage.features.list.${i}.title`],
    description: data[`homePage.features.list.${i}.description`],
    icon: item.icon,
  }))

  const translations = {
    hero: {
      title: data['homePage.hero.title'],
    },
    features: {
      label: data['homePage.features.label'],
      featuresList,
    },
  }

  return translations
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { features, hero } = await getTranslatedContent(locale, 'home_page12')

  const { data: scrollMarqueeData } = await translateWithCache({
    locale,
    updatedAt: 'scroll_marquee',
    content: {
      wordsLine1: wordsLine1.join(' '),
      wordsLine2: wordsLine2.join(' '),
    },
  })

  return (
    <section id="home" className="md:space-y-20 space-y-6">
      <HeroGrid title={hero.title} />

      <Container>
        <AutoMarquee />
      </Container>

      <Container>
        <Features features={features} />
      </Container>

      <ScrollMarquee
        wordsLine1={scrollMarqueeData?.wordsLine1.split(' ')}
        wordsLine2={scrollMarqueeData?.wordsLine2.split(' ')}
      />
    </section>
  )
}
