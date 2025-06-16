import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'
import Card from '@/components/Card'

export const metadata: Metadata = getMetadata({
  title: 'About | Next Multilang Template',
  description:
    'This is the about page of Next Multilang Template, a modern multi-language starter.',
  url: 'https://next-multilang-template.vercel.app',
  image: 'https://next-multilang-template.vercel.app/og-image.jpg',
})

export default function AboutPage() {
  const t = useTranslations('About')
  const t2 = useTranslations('HomePage')

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    memberSince: new Date('2020-01-01'),
    numFollowers: 10,
  }

  const features = t2.raw('featuresList') as {
    title: string
    description: string
  }[]

  return (
    <section id="about" className="md:space-y-20 space-y-6">
      <Container className="animate-in fade-in">
        <h1>{t('title', { firstName: user.firstName })}</h1>
        <p>{t('membership', { memberSince: user.memberSince })}</p>
        <p>{t('followers', { count: user.numFollowers })}</p>

        <p>{t('description')}</p>
      </Container>
      <Card>
        <h2 className="text-3xl font-bold mb-10">✨ {t2('features')}</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium ">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-3xl font-bold mb-10">✨ {t2('features')}</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium ">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
