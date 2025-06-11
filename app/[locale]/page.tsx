import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const t = useTranslations('HomePage')

  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  )
}
