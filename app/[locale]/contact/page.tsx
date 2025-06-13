import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Contact | Next Multilang Template',
  description:
    'This is the contact page of Next Multilang Template, a modern multi-language starter.',
  url: 'https://next-multilang-template.vercel.app',
  image: 'https://next-multilang-template.vercel.app/og-image.jpg',
})

export default function ContactPage() {
  const t = useTranslations('Contact')
  const t2 = useTranslations('HomePage')

  const features = t2.raw('featuresList') as {
    title: string
    description: string
  }[]

  return (
    <section id="contact">
      <Container className="animate-in fade-in">
        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </Container>

      <Container
        variant="breakpointPadded"
        className="animate-in fade-in bg-secondary text-secondary-foreground"
      >
        <h2 className="text-3xl font-bold mb-10">✨ {t2('features')}</h2>
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
        <h2 className="text-3xl font-bold mb-10">✨ {t2('features')}</h2>
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
