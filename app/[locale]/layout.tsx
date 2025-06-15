import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/providers/ThemeProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'
import TrackScroll from '@/components/TrackScroll'
import { ClerkProvider } from '@clerk/nextjs'
import '@/app/globals.css'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TrackScroll />
        <ClerkProvider>
          <NextIntlClientProvider locale={locale}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col  ">
                <div className="flex justify-between items-center w-full md:p-4 p-2">
                  <h1 className="hidden md:block scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ">
                    Thomas
                  </h1>
                  <MobileNav />
                  <Navbar />
                  <div className="flex gap-2">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                  </div>
                </div>
                <div>{children}</div>
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
