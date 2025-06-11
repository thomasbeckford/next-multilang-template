import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/providers/ThemeProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Container } from '@/components/ui/container'
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
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Container>
              <div className="flex justify-end gap-2 items-center align-center p-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </Container>

            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
