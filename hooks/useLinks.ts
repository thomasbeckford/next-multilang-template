import getPublicTranslations from '@/lib/translations/getPublicTranslations'

export const getTranslatedLinks = async (locale: string) => {
  const { NAVBAR_TEXTS } = await getPublicTranslations(locale)

  return [
    {
      href: '/',
      label: NAVBAR_TEXTS.home,
      description: NAVBAR_TEXTS.homeDescription,
    },
    {
      href: '/about',
      label: NAVBAR_TEXTS.about,
      description: NAVBAR_TEXTS.aboutDescription,
    },
    {
      href: '/contact',
      label: NAVBAR_TEXTS.contact,
      description: NAVBAR_TEXTS.contactDescription,
    },
    {
      href: '/dashboard',
      label: NAVBAR_TEXTS.dashboard,
      description: NAVBAR_TEXTS.dashboardDescription,
    },
  ]
}
