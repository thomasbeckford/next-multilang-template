'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      {routing.locales.map((locale) => (
        <button key={locale} onClick={() => handleChange(locale)}>
          {locale === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
        </button>
      ))}
    </div>
  )
}
