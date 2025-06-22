import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Metadata } from 'next'
import getMetadata from '@/lib/seo'
import { getContactData } from '@/sanity/queries'
import { queries } from '@/queries'
import { Locale } from '@/lib/constants'
import { HydrationBoundary } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/providers/getQueryClient'
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
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: [queries.contact.GET_CONTACT_DATA, locale],
    queryFn: () => getContactData(locale as Locale),
  })

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Contact />
    </HydrationBoundary>
  )
}
