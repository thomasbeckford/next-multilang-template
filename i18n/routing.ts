import { defineRouting } from 'next-intl/routing'
import locales from '@/i18n/locales'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales.map((locale) => locale.value),

  // Used when no locale matches
  defaultLocale: 'en',
})
