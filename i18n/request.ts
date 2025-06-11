import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: {
      Navbar: (await import(`../messages/${locale}/Navbar.json`)).default,
      HomePage: (await import(`../messages/${locale}/HomePage.json`)).default,
      About: (await import(`../messages/${locale}/About.json`)).default,
    },
  }
})
