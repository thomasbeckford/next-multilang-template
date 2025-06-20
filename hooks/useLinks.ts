import { useTranslations } from 'next-intl'

const useLinks = () => {
  const t = useTranslations('Navbar')

  const links = [
    {
      href: '/',
      label: t('home'),
      description: t('homeDescription'),
    },
    {
      href: '/about',
      label: t('about'),
      description: t('aboutDescription'),
    },
    {
      href: '/contact',
      label: t('contact'),
      description: t('contactDescription'),
    },
    {
      href: '/dashboard',
      label: t('dashboard'),
      description: t('dashboardDescription'),
    },
  ]

  return links
}

export default useLinks
