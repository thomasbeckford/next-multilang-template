import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Explicacion del middleware
// intlMiddleware: Para manejar la internacionalizacion
// clerkMiddleware: Para manejar la autenticacion
// isProtectedRoute: Para manejar las rutas protegidas

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: true,
})

const isProtectedRoute = createRouteMatcher(
  routing.locales.flatMap((locale) => [
    `/${locale}/dashboard`,
    `/${locale}/dashboard/(.*)`,
    `/${locale}/settings`,
    `/${locale}/settings/(.*)`,
  ])
)

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    console.log('Protegida')
    await auth.protect()
  }
  return intlMiddleware(req)
})

// Que hace el matcher?
// En todas estas rutas, el middleware se ejecuta
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
