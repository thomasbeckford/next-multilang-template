'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'

export default function AboutPage() {
  const t = useTranslations('About')

  const user = {
    firstName: 'John',
    memberSince: new Date('2020-01-01'),
    numFollowers: 10,
  }

  return (
    <Container>
      <section>
        <h1>{t('title', { firstName: user.firstName })}</h1>
        <p>{t('membership', { memberSince: user.memberSince })}</p>
        <p>{t('followers', { count: user.numFollowers })}</p>
      </section>
    </Container>
  )
}
