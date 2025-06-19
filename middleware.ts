import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'

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
  const { pathname } = req.nextUrl

  // 👇 Esta línea evita aplicar next-intl a /studio y sus subrutas
  if (pathname.startsWith('/studio')) {
    console.log('Studio')
    return NextResponse.next()
  }

  if (isProtectedRoute(req)) {
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
