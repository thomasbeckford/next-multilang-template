import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/providers/ThemeProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'
import { ScrollProgress } from '@/components/animate-ui/components/scroll-progress'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '@/components/Footer'
import { TanstackQueryProvider } from '@/providers/TanstackQuery'
import { getTranslatedLinks } from '@/hooks/useLinks'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@/app/globals.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const links = await getTranslatedLinks(locale)

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TanstackQueryProvider>
          <ClerkProvider>
            <NextIntlClientProvider locale={locale}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col justify-between min-h-screen">
                  <div className="flex justify-between items-center w-full md:p-4 p-2">
                    <h1 className="hidden md:block scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ">
                      LOGO
                    </h1>
                    <MobileNav />
                    <Navbar links={links} />
                    <div className="flex gap-2">
                      <LanguageSwitcher />
                      <ThemeSwitcher />
                    </div>
                  </div>

                  <div>
                    <ScrollProgress />
                    <main className="mb-12 md:mb-20 flex-start">
                      {children}
                    </main>
                  </div>
                  <Footer />
                </div>
              </ThemeProvider>
            </NextIntlClientProvider>
          </ClerkProvider>
        </TanstackQueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
