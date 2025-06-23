import { type Metadata } from 'next'

import { translateWithCache } from '@/lib/translations/translateWithCache'
import getMetadata from '@/lib/seo'
import HeroGrid from '@/components/HeroGrid'
import { Container } from '@/components/ui/container'
import ScrollMarquee from '@/components/ScrollMarquee'
import AutoMarquee from '@/components/AutoMarquee'
import Features from '@/components/Features'

export const metadata: Metadata = getMetadata({
  title: 'Home | ClearSpeak',
  description:
    'This is the homepage of ClearSpeak, a modern multi-language starter.',
  url: 'https://clearkspeak1.vercel.app',
  image: 'https://clearkspeak1.vercel.app/og-image.jpg',
})

const HOMEPAGE_TEXTS = {
  title: 'Build your multilingual app in seconds',
  features: 'Features',
  featuresList: [
    {
      title: 'Real-time Translation',
      description: 'Translate content instantly as users browse.',
      icon: 'ArrowRight',
    },
    {
      title: 'Fully Responsive',
      description: 'Works perfectly on all screen sizes.',
      icon: 'Paintbrush',
    },
    {
      title: 'SEO Friendly',
      description: 'Built-in metadata and semantic markup.',
      icon: 'ExternalLink',
    },
    {
      title: 'Accessible',
      description: 'WCAG compliant design and interactions.',
      icon: 'RefreshCcw',
    },
  ],
}

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
  console.log('features', features)
  return (
    <section id="home" className="md:space-y-20 space-y-6">
      <HeroGrid title={hero.title} />

      <Container>
        <AutoMarquee />
      </Container>

      <Container>
        <Features features={features} />
      </Container>

      <ScrollMarquee />
    </section>
  )
}
