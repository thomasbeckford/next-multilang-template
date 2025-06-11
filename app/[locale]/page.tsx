import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/container'
import getMetadata from '@/lib/seo'
import { type Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Home | Next Multilang Template',
  description:
    'This is the homepage of Next Multilang Template, a modern multi-language starter.',
  url: 'https://next-multilang-template.vercel.app',
  image: 'https://next-multilang-template.vercel.app/og-image.jpg',
})

export default function HomePage() {
  const t = useTranslations('HomePage')
  const features = t.raw('features') as { title: string; description: string }[]

  return (
    <section className="">
      <Container variant="constrainedPadded">
        <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

        <h2 className="text-3xl font-bold mb-10">✨ Features</h2>
        <ul className="space-y-6">
          {features.map(({ title, description }) => (
            <li key={title}>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link href="/about" className="underline text-primary">
            {t('about')}
          </Link>
        </div>
      </Container>
    </section>
  )
}
