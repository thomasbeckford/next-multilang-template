import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Metadata } from 'next'
import getMetadata from '@/lib/seo'
import { getContactData } from '@/sanity/queries'
import { Locale } from '@/lib/constants'
import Contact from '@/components/screens/Contact'

export const metadata: Metadata = getMetadata({
  title: 'Contact | ClearSpeak',
  description:
    'Contact the ClearSpeak team to learn more about multilingual website solutions.',
  url: 'https://clearspeak.app/contact',
  image: 'https://clearspeak.app/og-image.jpg',
})

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const contactData = await getContactData(locale as Locale)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return <Contact contactData={contactData?.data} />
}
