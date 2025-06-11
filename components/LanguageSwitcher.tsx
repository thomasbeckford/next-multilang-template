'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale })
  }

  return (
    <Select onValueChange={handleChange} value={locale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
