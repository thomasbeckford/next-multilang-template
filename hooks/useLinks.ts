import { translateWithCache } from '@/lib/translations/translateWithCache'

const updatedAt = '2025-06-25' // o un valor fijo que cambies cuando cambie el contenido
const NAVBAR_TEXTS = {
  home: 'Home',
  homeDescription: 'Go back to homepage',
  about: 'About',
  aboutDescription: 'Learn more about us',
  contact: 'Contact',
  contactDescription: 'Get in touch with us',
  dashboard: 'Dashboard',
  dashboardDescription: 'Manage your account',
}

export const getTranslatedLinks = async (locale: string) => {
  const { data } = await translateWithCache({
    locale,
    updatedAt,
    content: NAVBAR_TEXTS,
  })

  return [
    {
      href: '/',
      label: data.home,
      description: data.homeDescription,
    },
    {
      href: '/about',
      label: data.about,
      description: data.aboutDescription,
    },
    {
      href: '/contact',
      label: data.contact,
      description: data.contactDescription,
    },
    {
      href: '/dashboard',
      label: data.dashboard,
      description: data.dashboardDescription,
    },
  ]
}
