import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'About | Next Multilang Template',
  description:
    'This is the about page of Next Multilang Template, a modern multi-language starter.',
  url: 'https://next-multilang-template.vercel.app',
  image: 'https://next-multilang-template.vercel.app/og-image.jpg',
})

export default function AboutPage() {
  const t = useTranslations('About')

  const user = {
    firstName: 'John',
    memberSince: new Date('2020-01-01'),
    numFollowers: 10,
  }

  return (
    <section id="about">
      <Container className="animate-in fade-in">
        <h1>{t('title', { firstName: user.firstName })}</h1>
        <p>{t('membership', { memberSince: user.memberSince })}</p>
        <p>{t('followers', { count: user.numFollowers })}</p>
      </Container>
    </section>
  )
}
